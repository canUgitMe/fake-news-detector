"""
PHASE 1 — DATASET CLEANING & PREPROCESSING
File: backend/preprocess.py

Run: python preprocess.py
Output: output/cleaned_fake_news.csv
"""

import pandas as pd
import numpy as np
import re
import os
import unicodedata
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s — %(levelname)s — %(message)s")
logger = logging.getLogger(__name__)


# ─────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────
FAKE_PATH = "dataset/Fake.csv"
TRUE_PATH = "dataset/True.csv"
OUTPUT_DIR = "output"
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "cleaned_fake_news.csv")


# ─────────────────────────────────────────
# STEP 1: LOAD DATASETS
# ─────────────────────────────────────────
def load_datasets(fake_path: str, true_path: str) -> pd.DataFrame:
    """Load Fake and True CSVs, assign labels, and merge into one DataFrame."""
    logger.info("Loading datasets...")

    df_fake = pd.read_csv(fake_path)
    df_true = pd.read_csv(true_path)

    logger.info(f"Fake news records loaded: {len(df_fake)}")
    logger.info(f"Real news records loaded: {len(df_true)}")

    # Assign labels
    df_fake["label"] = "FAKE"
    df_true["label"] = "REAL"

    # Merge datasets
    df = pd.concat([df_fake, df_true], ignore_index=True)

    # Shuffle to prevent ordering bias during training
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)

    logger.info(f"Total records after merge: {len(df)}")
    return df


# ─────────────────────────────────────────
# STEP 2: SELECT RELEVANT COLUMNS
# ─────────────────────────────────────────
def select_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Keep only title, text, and label. Combine title + text into one 'content' field."""
    logger.info("Selecting and combining relevant columns...")

    # Handle datasets that may have 'title' and/or 'text'
    available_cols = df.columns.tolist()

    if "title" in available_cols and "text" in available_cols:
        df["content"] = df["title"].fillna("") + " " + df["text"].fillna("")
    elif "text" in available_cols:
        df["content"] = df["text"].fillna("")
    elif "title" in available_cols:
        df["content"] = df["title"].fillna("")
    else:
        raise ValueError("Dataset must have at least a 'text' or 'title' column.")

    df = df[["content", "label"]].copy()
    return df


# ─────────────────────────────────────────
# STEP 3: REMOVE NULL & DUPLICATES
# ─────────────────────────────────────────
def remove_nulls_and_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    """Drop rows with null content and remove duplicate entries."""
    logger.info("Removing null values and duplicates...")

    before = len(df)
    df.dropna(subset=["content"], inplace=True)
    df.drop_duplicates(subset=["content"], inplace=True)
    df = df[df["content"].str.strip() != ""]
    after = len(df)

    logger.info(f"Removed {before - after} rows (nulls + duplicates). Remaining: {after}")
    return df


# ─────────────────────────────────────────
# STEP 4: TEXT CLEANING FUNCTIONS
# ─────────────────────────────────────────
def remove_urls(text: str) -> str:
    """Remove HTTP/HTTPS URLs and www links."""
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"www\.\S+", " ", text)
    return text


def remove_html_tags(text: str) -> str:
    """Strip HTML/XML tags from text."""
    text = re.sub(r"<[^>]+>", " ", text)
    return text


def remove_emojis(text: str) -> str:
    """Remove emojis and special unicode symbols."""
    # Remove emoji ranges
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags
        "\U00002500-\U00002BEF"
        "\U00002702-\U000027B0"
        "\U000024C2-\U0001F251"
        "\U0001f926-\U0001f937"
        "\U00010000-\U0010ffff"
        "\u2640-\u2642"
        "\u2600-\u2B55"
        "\u200d"
        "\u23cf"
        "\u23e9"
        "\u231a"
        "\ufe0f"
        "\u3030"
        "]+",
        flags=re.UNICODE,
    )
    return emoji_pattern.sub(" ", text)


def normalize_unicode(text: str) -> str:
    """Normalize unicode characters to ASCII where possible."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("utf-8")
    return text


def remove_special_characters(text: str) -> str:
    """Remove special characters, keeping only letters, numbers, and basic punctuation."""
    # Keep alphanumeric and spaces
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return text


def remove_extra_whitespace(text: str) -> str:
    """Strip leading/trailing spaces and collapse multiple spaces."""
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def clean_text(text: str) -> str:
    """Apply full NLP preprocessing pipeline to a single text string."""
    if not isinstance(text, str):
        return ""

    text = remove_urls(text)
    text = remove_html_tags(text)
    text = remove_emojis(text)
    text = normalize_unicode(text)
    text = text.lower()  # Convert to lowercase
    text = remove_special_characters(text)
    text = remove_extra_whitespace(text)

    return text


# ─────────────────────────────────────────
# STEP 5: APPLY CLEANING TO DATASET
# ─────────────────────────────────────────
def apply_cleaning(df: pd.DataFrame) -> pd.DataFrame:
    """Apply the full text cleaning pipeline to the content column."""
    logger.info("Applying text cleaning pipeline...")

    df["content"] = df["content"].apply(clean_text)

    # Drop any rows that became empty after cleaning
    before = len(df)
    df = df[df["content"].str.strip() != ""]
    after = len(df)

    logger.info(f"Dropped {before - after} rows that became empty after cleaning.")
    logger.info(f"Final clean dataset size: {after}")

    return df


# ─────────────────────────────────────────
# STEP 6: ENCODE LABELS
# ─────────────────────────────────────────
def encode_labels(df: pd.DataFrame) -> pd.DataFrame:
    """Add a numeric label column: FAKE=0, REAL=1."""
    logger.info("Encoding labels...")
    df["label_encoded"] = df["label"].map({"FAKE": 0, "REAL": 1})
    return df


# ─────────────────────────────────────────
# STEP 7: SAVE CLEANED DATASET
# ─────────────────────────────────────────
def save_dataset(df: pd.DataFrame, output_path: str) -> None:
    """Save the cleaned DataFrame to CSV."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    logger.info(f"Cleaned dataset saved → {output_path}")


# ─────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────
def main():
    logger.info("=" * 50)
    logger.info("FAKE NEWS DETECTOR — DATA PREPROCESSING")
    logger.info("=" * 50)

    # Load
    df = load_datasets(FAKE_PATH, TRUE_PATH)

    # Select columns
    df = select_columns(df)

    # Remove nulls and duplicates
    df = remove_nulls_and_duplicates(df)

    # Clean text
    df = apply_cleaning(df)

    # Encode labels
    df = encode_labels(df)

    # Dataset summary
    logger.info("\n--- DATASET SUMMARY ---")
    logger.info(f"Total records: {len(df)}")
    logger.info(f"FAKE records: {len(df[df['label'] == 'FAKE'])}")
    logger.info(f"REAL records: {len(df[df['label'] == 'REAL'])}")
    logger.info(f"Columns: {df.columns.tolist()}")
    logger.info(f"\nSample:\n{df.head(3)}")

    # Save
    save_dataset(df, OUTPUT_PATH)

    logger.info("\n✅ Preprocessing complete!")


if __name__ == "__main__":
    main()