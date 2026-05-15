// frontend/src/components/About.jsx
import '../styles/About.css';

export default function About() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__card">
          {/* Left: Text */}
          <div className="about__text">
            <h3 className="about__title">About This Project</h3>
            <p className="about__desc">
              My Fake News Detector is a machine learning project that classifies
              news articles as Fake or Real using NLP and ML techniques. Trained on
              a dataset of 20K+ news articles from reliable sources.
            </p>
            <button className="btn-primary about__cta" onClick={() => scrollTo('detector')}>
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Right: Illustration */}
          <div className="about__illustration">
            <div className="about__ill-bg"></div>
            <svg width="120" height="130" viewBox="0 0 120 130" fill="none" className="about__ill-svg">
              {/* Document */}
              <rect x="20" y="10" width="70" height="90" rx="6" fill="rgba(0,255,102,0.06)" stroke="rgba(0,255,102,0.2)" strokeWidth="1.5"/>
              <line x1="34" y1="32" x2="76" y2="32" stroke="rgba(0,255,102,0.25)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="34" y1="44" x2="76" y2="44" stroke="rgba(0,255,102,0.18)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="34" y1="56" x2="60" y2="56" stroke="rgba(0,255,102,0.18)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="34" y1="68" x2="72" y2="68" stroke="rgba(0,255,102,0.12)" strokeWidth="2" strokeLinecap="round"/>
              {/* Magnifying glass */}
              <circle cx="78" cy="88" r="22" fill="rgba(0,255,102,0.06)" stroke="rgba(0,255,102,0.3)" strokeWidth="2"/>
              <circle cx="78" cy="88" r="13" fill="rgba(0,255,102,0.08)" stroke="rgba(0,255,102,0.2)" strokeWidth="1.5"/>
              <line x1="89" y1="99" x2="100" y2="112" stroke="rgba(0,255,102,0.4)" strokeWidth="3" strokeLinecap="round"/>
              {/* Check mark inside magnifier */}
              <polyline points="72,88 76,92 84,84" stroke="var(--neon-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}