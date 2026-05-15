// frontend/src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="navbar__logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="var(--neon-green)" opacity="0.2"/>
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="var(--neon-green)" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <span>The<span className="logo-accent"> FN</span> Detector</span>
        </div>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button></li>
          <li><button onClick={() => scrollTo('detector')}>Detector</button></li>
          <li><button onClick={() => scrollTo('how-it-works')}>How It Works</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('stats')}>Statistics</button></li>
          <li><button onClick={() => scrollTo('footer')}>Contact</button></li>
        </ul>

        {/* CTA */}
        <button className="navbar__cta btn-primary" onClick={() => scrollTo('detector')}>
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
          <button onClick={() => scrollTo('detector')}>Detector</button>
          <button onClick={() => scrollTo('how-it-works')}>How It Works</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('stats')}>Statistics</button>
          <button onClick={() => scrollTo('footer')}>Contact</button>
          <button className="btn-primary" onClick={() => scrollTo('detector')}>Get Started</button>
        </div>
      )}
    </nav>
  );
}