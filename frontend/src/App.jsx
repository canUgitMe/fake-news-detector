// frontend/src/App.jsx
import './styles/globals.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Detector from './components/Detector';
import Performance from './components/Performance';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Background grid texture */}
      <div className="bg-grid" aria-hidden="true"></div>

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Detector />
        <Performance />
        <About />
      </main>

      <Footer />
    </>
  );
}