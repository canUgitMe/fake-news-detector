// frontend/src/components/Detector.jsx
import React, { useState, useRef } from 'react';
import '../styles/Detector.css';

const MAX_CHARS = 10000;
const MIN_WORDS = 50;
// Hardcoded Render backend URL — no env variable dependency
const API_URL   = 'https://fake-news-detector-api-vikp.onrender.com/api/predict';

function countWords(str) {
  return str.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
}

export default function Detector() {
  var [text, setText]       = useState('');
  var [loading, setLoading] = useState(false);
  var [result, setResult]   = useState(null);
  var [error, setError]     = useState('');
  var textareaRef           = useRef(null);

  var wordCount  = text.trim() ? countWords(text) : 0;
  var isTooShort = wordCount > 0 && wordCount < MIN_WORDS;

  var handleAnalyze = async function() {
    if (!text.trim()) {
      setError('Please paste the full news article content to analyze.');
      return;
    }
    if (wordCount < 10) {
      setError('Too little content. Please paste the full article body, not just the headline.');
      return;
    }
    setError('');
    setResult(null);
    setLoading(true);
    try {
      var response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      var data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setResult(data);
    } catch (err) {
      if (err.name === 'TypeError') {
        setError('Cannot reach the server. Make sure Flask backend is running on port 5000.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  var handleClear = function() {
    setText('');
    setResult(null);
    setError('');
    if (textareaRef.current) textareaRef.current.focus();
  };

  var isFake = result && result.label === 'FAKE';

  return (
    <section className="detector" id="detector">
      <div className="detector__container">

        {/* ── LEFT ── */}
        <div className="detector__left">
          <p className="detector__eyebrow">Try the</p>
          <h2 className="detector__heading">
            <span className="detector__accent">Fake News</span> Detector
          </h2>
          <p className="detector__sub">
            Paste the full news article body below, not just the headline, and let our AI analyze whether it is Fake or Real.
          </p>

          {/* How-to box — NO <strong> tags anywhere, plain text only */}
          <div className="detector__howto">
            <div className="detector__howto-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              How to get accurate results
            </div>
            <ul className="detector__howto-list">
              <li>
                <span className="howto-good">✓</span>
                <span>Paste the full article including all paragraphs</span>
              </li>
              <li>
                <span className="howto-good">✓</span>
                <span>Include at least 50 or more words of article body</span>
              </li>
              <li>
                <span className="howto-bad">✗</span>
                <span>Do not paste only the headline, it has too little signal</span>
              </li>
              <li>
                <span className="howto-bad">✗</span>
                <span>Model detects writing style, not factual verification</span>
              </li>
            </ul>
          </div>

          <div className="detector__features">
            <div className="detector__feature">
              <div className="detector__feat-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              </div>
              <div>
                <p className="detector__feat-title">Powered by Machine Learning</p>
                <p className="detector__feat-desc">Trained on 20K+ complete news articles</p>
              </div>
            </div>
            <div className="detector__feature">
              <div className="detector__feat-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <p className="detector__feat-title">NLP Style Analysis</p>
                <p className="detector__feat-desc">Detects writing patterns, not just keywords</p>
              </div>
            </div>
            <div className="detector__feature">
              <div className="detector__feat-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
                  <polyline points="9 12 11 14 15 10" strokeWidth="2.5"/>
                </svg>
              </div>
              <div>
                <p className="detector__feat-title">High Accuracy</p>
                <p className="detector__feat-desc">Up to 95% accuracy on full article text</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="detector__right">
          <div className="detector__input-wrap">
            <div className="detector__label-row">
              <label className="detector__label">Enter Full News Article</label>
              <span className={
                'detector__wordcount ' +
                (isTooShort ? 'wordcount--warn' : wordCount >= MIN_WORDS ? 'wordcount--ok' : '')
              }>
                {wordCount} words
                {isTooShort ? ' — needs ' + (MIN_WORDS - wordCount) + ' more' : ''}
                {wordCount >= MIN_WORDS ? ' ✓' : ''}
              </span>
            </div>

            {isTooShort && (
              <div className="detector__nudge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0,marginTop:'2px'}}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>You have pasted only a headline or a few words. Please paste the full article body with all paragraphs for a reliable prediction.</span>
              </div>
            )}

            <textarea
              ref={textareaRef}
              className={'detector__textarea' + (isTooShort ? ' textarea--warn' : '')}
              placeholder="Paste the full news article here — body text and all paragraphs. Do not paste only the headline."
              value={text}
              onChange={function(e) {
                if (e.target.value.length <= MAX_CHARS) {
                  setText(e.target.value);
                  setError('');
                }
              }}
            />

            <div className="detector__row">
              <span className="detector__count">{text.length} / {MAX_CHARS} characters</span>
              <div className="detector__btns">
                {text && (
                  <button className="detector__clear" onClick={handleClear}>Clear</button>
                )}
                <button
                  className="detector__analyze"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? (
                    <><div className="detector__spin"></div>Analyzing...</>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      Analyze News
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="detector__error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0,marginTop:'2px'}}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* ── RESULT ── */}
          {result && (
            <div className={'detector__result ' + (isFake ? 'result--fake' : 'result--real')}>
              {result.warning && (
                <div className="detector__result-warning">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0,marginTop:'1px'}}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>{result.warning}</span>
                </div>
              )}

              <div className="detector__verdict">
                <div className={'detector__verdict-icon ' + (isFake ? 'icon--fake' : 'icon--real')}>
                  {isFake ? (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
                      <polyline points="9 12 11 14 15 10" strokeWidth="2.5"/>
                    </svg>
                  )}
                </div>
                <div className="detector__verdict-text">
                  <div className={'detector__verdict-label ' + (isFake ? 'label--fake' : 'label--real')}>
                    {result.label}
                  </div>
                  <div className="detector__verdict-sub">
                    This article appears to be{' '}
                    <span className={isFake ? 'label--fake' : 'label--real'}>
                      {isFake ? 'Fake News' : 'Real News'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detector__sep"></div>

              <div className="detector__meta">
                <div className="detector__meta-item">
                  <span className="detector__meta-icon"></span>
                  <span className="detector__meta-val">{result.word_count}</span>
                  <span className="detector__meta-lbl">words</span>
                </div>
                <div className="detector__meta-divider"></div>
                <div className="detector__meta-item">
                  <span className="detector__meta-icon"></span>
                  <span className="detector__meta-val">{result.text_length}</span>
                  <span className="detector__meta-lbl">characters</span>
                </div>
                <div className="detector__meta-divider"></div>
                <div className={'detector__meta-item ' + (result.word_count >= MIN_WORDS ? 'meta--good' : 'meta--warn')}>
                  <span className="detector__meta-lbl">
                    {result.word_count >= MIN_WORDS ? '✅ Sufficient content' : '⚠️ Low word count'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}