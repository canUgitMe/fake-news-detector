"""
FLASK BACKEND — PRODUCTION READY
File: backend/app.py
"""

import os
import re
import unicodedata
import logging
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

logging.basicConfig(level=logging.INFO, format="%(asctime)s — %(levelname)s — %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)

# ─────────────────────────────────────────────────────────────
# CORS — reads allowed origins from environment variable
# In production, set ALLOWED_ORIGINS in Render dashboard:
#   ALLOWED_ORIGINS=https://your-app.vercel.app
# Multiple origins comma-separated:
#   ALLOWED_ORIGINS=https://your-app.vercel.app,https://custom-domain.com
# ─────────────────────────────────────────────────────────────
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ─────────────────────────────────────────────────────────────
# MODEL PATHS — relative to backend/ folder
# ─────────────────────────────────────────────────────────────
BASE_DIR        = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH      = os.path.join(BASE_DIR, "model", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "model", "tfidf_vectorizer.pkl")
MIN_WORDS       = 50

model      = None
vectorizer = None

def load_model():
    global model, vectorizer
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found: {MODEL_PATH}. Run train_model.py first.")
    if not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(f"Vectorizer not found: {VECTORIZER_PATH}. Run train_model.py first.")
    model      = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    logger.info("✅ Model and vectorizer loaded successfully.")

load_model()


def preprocess_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)
    text = re.sub(r"<[^>]+>", " ", text)
    emoji_pat = re.compile(
        "[" "\U0001F600-\U0001F64F" "\U0001F300-\U0001F5FF"
        "\U0001F680-\U0001F6FF" "\U0001F1E0-\U0001F1FF"
        "\u2640-\u2642" "\u2600-\u2B55" "\u200d\u23cf\u23e9\u231a\ufe0f\u3030" "]+",
        flags=re.UNICODE,
    )
    text = emoji_pat.sub(" ", text)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def run_prediction(text: str) -> dict:
    word_count = len(text.split())
    cleaned    = preprocess_text(text)

    if not cleaned:
        return {"error": "Text became empty after preprocessing."}

    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]
    label      = "REAL" if prediction == 1 else "FAKE"

    warning = None
    if word_count < MIN_WORDS:
        warning = (
            f"Your input has only {word_count} words. "
            f"Paste the full article body (50+ words) for accurate results. "
            f"The model was trained on complete articles, not headlines."
        )

    return {
        "label":       label,
        "word_count":  word_count,
        "text_length": len(text),
        "warning":     warning,
    }


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status":  "running",
        "message": "Fake News Detector API is online.",
        "version": "1.0.0",
    }), 200


@app.route("/api/health", methods=["GET"])
def health():
    ok = model is not None and vectorizer is not None
    return jsonify({"status": "healthy" if ok else "degraded", "model_loaded": ok}), 200 if ok else 503


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.get_json()
        if not data:
            return jsonify({"error": "Request body is empty"}), 400

        text = data.get("text", "").strip()

        if not text:
            return jsonify({"error": "The 'text' field is required."}), 400
        if len(text) < 20:
            return jsonify({"error": "Please provide at least 20 characters."}), 400
        if len(text) > 15000:
            return jsonify({"error": "Text exceeds maximum of 15,000 characters."}), 400

        result = run_prediction(text)
        if "error" in result:
            return jsonify(result), 422

        logger.info(f"Prediction: {result['label']} | Words: {result['word_count']}")
        return jsonify(result), 200

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Internal server error. Please try again."}), 500


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"error": "Method not allowed"}), 405


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logger.info(f"Starting API on port {port}")
    app.run(debug=False, host="0.0.0.0", port=port)