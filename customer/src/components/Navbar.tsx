import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Giới thiệu', path: '/gioi-thieu' },
  { label: 'Không gian', path: '/khong-gian' },
  { label: 'Liên hệ', path: '/lien-he' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled
          ? 'bg-espresso/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      <nav className="container-narrow flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-2xl tracking-wider text-cream no-underline hover:text-caramel transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          NÂU
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase no-underline transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-caramel'
                    : 'text-warm-300 hover:text-cream'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="/dat-mon"
          className="hidden md:inline-flex btn-primary text-xs"
        >
          Đặt món
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer bg-transparent border-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <span
            className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${
              isMobileOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-cream mt-[5px] transition-all duration-300 ${
              isMobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-cream mt-[5px] transition-all duration-300 ${
              isMobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'var(--color-espresso)' }}
      >
        <div className="container-narrow pb-8 pt-2">
          <ul className="list-none flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-2 text-base font-medium tracking-wider uppercase no-underline ${
                    location.pathname === link.path
                      ? 'text-caramel'
                      : 'text-warm-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/dat-mon" className="btn-primary w-full justify-center text-sm">
                Đặt món
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
