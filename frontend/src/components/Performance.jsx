// frontend/src/components/Performance.jsx
import '../styles/Performance.css';

const METRICS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="1.8">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>,
    value: '95%',
    label: 'Accuracy',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>,
    value: '0.94',
    label: 'Precision',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="1.8">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>,
    value: '0.95',
    label: 'Recall',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="1.8">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>,
    value: '0.95',
    label: 'F1-Score',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M7 17L11 13L14 16L18 11"/>
    </svg>,
    value: '0.98',
    label: 'ROC AUC',
  },
];

export default function Performance() {
  return (
    <section className="perf" id="performance">
      <div className="perf__container">
        <h2 className="section-title">Our Model Performance</h2>
        <div className="section-underline"></div>

        {/* Metric cards */}
        <div className="perf__cards">
          {METRICS.map((m, i) => (
            <div className="perf__card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="perf__card-icon">{m.icon}</div>
              <div className="perf__card-value">{m.value}</div>
              <div className="perf__card-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}