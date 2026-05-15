// frontend/src/components/HowItWorks.jsx
import React from 'react';
import '../styles/HowItWorks.css';

const STEPS = [
  {
    num: 1,
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="1.4">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <path d="M9 10l1.5 1.5L14 8" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Enter News',
    description: 'Paste or type the news content you want to analyze.',
  },
  {
    num: 2,
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="1.4">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    title: 'AI Analysis',
    description: 'Our AI model processes the content using NLP and ML algorithms.',
  },
  {
    num: 3,
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="1.4">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <circle cx="11" cy="15" r="3"/>
        <path d="M13.27 17.27L16 20"/>
      </svg>
    ),
    title: 'Detect & Predict',
    description: 'The model predicts whether the news is Fake or Real.',
  },
  {
    num: 4,
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="1.4">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
        <polyline points="9 12 11 14 15 10" strokeWidth="2"/>
      </svg>
    ),
    title: 'Get Result',
    description: 'View the result with confidence score and detailed analysis.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw__container">
        <h2 className="section-title">How It Works?</h2>
        <div className="section-underline"></div>

        <div className="hiw__outer">
          {/* ── Number row with single spanning connector line ── */}
          <div className="hiw__num-row">
            <div className="hiw__connector-line"></div>
            {STEPS.map(function(step) {
              return (
                <div className="hiw__num-wrap" key={step.num}>
                  <div className="hiw__num">{step.num}</div>
                </div>
              );
            })}
          </div>

          {/* ── Card row — same 4-column grid ── */}
          <div className="hiw__card-row">
            {STEPS.map(function(step, i) {
              return (
                <div
                  className="hiw__card"
                  key={step.num}
                  style={{ animationDelay: (i * 0.1) + 's' }}
                >
                  <div className="hiw__icon">{step.icon}</div>
                  <h3 className="hiw__title">{step.title}</h3>
                  <p className="hiw__desc">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}