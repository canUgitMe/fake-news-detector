# Fake News Detector

A full-stack application that detects fake news using machine learning.

## Project Structure

```
fake-news-detector/
├── backend/           - Flask API (Python)
│   ├── dataset/       - CSV datasets (Fake.csv, True.csv)
│   ├── model/         - Trained ML models
│   ├── output/        - Processed datasets
│   ├── preprocess.py  - Data cleaning
│   ├── train_model.py - Model training
│   ├── app.py         - Flask server
│   └── requirements.txt
│
└── frontend/          - React App
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place your `Fake.csv` and `True.csv` files in the `dataset/` folder

4. Run data preprocessing:
   ```bash
   python preprocess.py
   ```

5. Train the model:
   ```bash
   python train_model.py
   ```

6. Start the Flask server:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `GET /api/health` - API status
- `POST /api/predict` - Predict if news is fake or true
  - Request body: `{ "text": "news article text" }`
  - Response: `{ "prediction": "True News/Fake News", "confidence": 0.98, "probability": {...} }`

## Model Performance

- Accuracy: ~98%
- Precision: ~97%
- Recall: ~96%
- F1-Score: ~97%

## Technology Stack

- **Backend:** Flask, scikit-learn, pandas, nltk
- **Frontend:** React, Vite
- **ML:** TF-IDF Vectorization, Logistic Regression
