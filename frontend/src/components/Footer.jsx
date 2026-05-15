// frontend/src/components/Footer.jsx
import { useState } from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className="footer__container">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                    stroke="var(--neon-green)" strokeWidth="1.5" fill="rgba(0,255,102,0.1)"/>
                </svg>
              </div>
              <span>The <span className="footer__logo-accent">FN</span> Detector</span>
            </div>
            <p className="footer__tagline">Detect Fake News. Trust the Truth.</p>
            <p className="footer__copy">© 2026 All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              <li><button onClick={() => scrollTo('home')}>Home</button></li>
              <li><button onClick={() => scrollTo('detector')}>Detector</button></li>
              <li><button onClick={() => scrollTo('how-it-works')}>How It Works</button></li>
              <li><button onClick={() => scrollTo('about')}>About</button></li>
              <li><button onClick={() => scrollTo('footer')}>Contact</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            <ul className="footer__links">
              <li><a href="https://github.com/canUgitMe" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://github.com/canUgitMe/Fake_News_Detection-csv-" target="_blank" rel="noreferrer">Dataset</a></li>
              <li><a href="https://github.com/canUgitMe/Fake_News_Detection-csv-/blob/main/CODE.md" target="_blank" rel="noreferrer">Documentation</a></li>
              <li><a href="https://github.com/canUgitMe/Fake_News_Detection-csv-/blob/main/Privacy%20Policy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
              <li><a href="https://github.com/canUgitMe/Fake_News_Detection-csv-/blob/main/Terms%20Of%20Use" target="_blank" rel="noreferrer">Terms of Use</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <div className="footer__socials">
              <a href="https://x.com/arijitttttttt" target="_blank" rel="noreferrer" className="footer__social" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/arijit-adhikary26/" target="_blank" rel="noreferrer" className="footer__social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:arijitadhikary777@gmail.com" className="footer__social" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-desc">Subscribe to get updates and new features.</p>
            <form className="footer__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="footer__subscribe-btn" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
            {subscribed && (
              <p className="footer__subscribed">✓ Subscribed successfully!</p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative sparkle */}
      <div className="footer__sparkle">✦</div>
    </footer>
  );
}