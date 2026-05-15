// frontend/src/components/Hero.jsx
import '../styles/Hero.css';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__container">
        {/* LEFT — Text */}
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            AI-Powered Detection
          </div>

          <h1 className="hero__heading">
            Detect Fake News<br />
            Before It Spreads.<br />
            <span className="hero__heading-accent">Trust the Truth.</span>
          </h1>

          <p className="hero__description">
            My Fake News Detector uses Machine Learning and NLP to analyze news
            content and detect whether it's Fake or Real in seconds.
          </p>

          <div className="hero__actions">
            <button className="btn-primary hero__cta-main" onClick={() => scrollTo('detector')}>
              Try Detector
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('how-it-works')}>
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </button>
          </div>

          <div className="hero__social-proof">
            <div className="hero__avatars">
              <div className="hero__avatar hero__avatar--1">A</div>
              <div className="hero__avatar hero__avatar--2">B</div>
              <div className="hero__avatar hero__avatar--3">C</div>
            </div>
            <div>
              <span className="hero__proof-count">10K+</span>
              <span className="hero__proof-label">Users trust our detector</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Analysis Card Mockup */}
        <div className="hero__right">
          {/* Decorative glow orb */}
          <div className="hero__glow-orb"></div>

          {/* Sparkles */}
          <div className="hero__sparkle hero__sparkle--1">✦</div>
          <div className="hero__sparkle hero__sparkle--2">✦</div>

          {/* Analysis Card */}
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                    stroke="var(--neon-green)" strokeWidth="1.5" fill="rgba(0,255,102,0.1)"/>
                </svg>
              </div>
              <span className="hero__card-title">News Analysis</span>
              <div className="hero__card-check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>

            {/* Donut chart */}
            <div className="hero__donut-wrap">
              <svg className="hero__donut" viewBox="-10 -10 140 140" width="140" height="140">
                <defs>
                  {/*
                    SVG feGaussianBlur filter — unlike CSS drop-shadow,
                    this follows the actual stroke path geometry (circular),
                    not the element bounding box (rectangular).
                    x/y/width/height overflow so glow isn't clipped.
                  */}
                  <filter id="circleGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Track ring */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(0,255,102,0.08)" strokeWidth="10"/>

                {/*
                  Outer soft glow layer — wider stroke, very transparent.
                  Drawn first so it sits behind the main stroke.
                  No bounding-box artifact because it uses SVG filter, not CSS.
                */}
                <circle
                  cx="60" cy="60" r="48"
                  fill="none"
                  stroke="rgba(0,255,102,0.25)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray="301.59"
                  strokeDashoffset="39.21"
                  transform="rotate(-90 60 60)"
                  filter="url(#circleGlow)"
                />

                {/* Main progress stroke — crisp on top */}
                <circle
                  cx="60" cy="60" r="48"
                  fill="none"
                  stroke="#00ff66"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="301.59"
                  strokeDashoffset="39.21"
                  transform="rotate(-90 60 60)"
                />

                <text x="60" y="54" textAnchor="middle" fill="#00ff66" fontSize="16" fontWeight="700" fontFamily="Space Grotesk">REAL</text>
                <text x="60" y="70" textAnchor="middle" fill="#a0a0a0" fontSize="9" fontFamily="Space Grotesk">87%</text>
                <text x="60" y="81" textAnchor="middle" fill="#555" fontSize="8" fontFamily="Space Grotesk">Confidence Score</text>
              </svg>
            </div>

            {/* Checklist */}
            <div className="hero__checklist">
              {['Language Pattern', 'Source Reliability', 'Content Consistency', 'Sentiment Analysis'].map((item) => (
                <div className="hero__check-item" key={item}>
                  <div className="hero__check-icon">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero__card-footer">
              This news is likely to be <span>Real.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}