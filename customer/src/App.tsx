import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactButton } from './components/FloatingContactButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scroll + connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="app-container">
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
      <FloatingContactButton />
    </div>
  );
}

export default App;
