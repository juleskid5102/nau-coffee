import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Trang Chủ' },
  { to: '/menu', label: 'Menu' },
  { to: '/gioi-thieu', label: 'Giới Thiệu' },
  { to: '/khong-gian', label: 'Không Gian' },
  { to: '/lien-he', label: 'Liên Hệ' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Floating Island */}
      <nav className="floating-nav" role="navigation" aria-label="Main navigation">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          NÂU
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link to="/dat-mon" className="nav-cta hidden md:inline-flex" style={{ textDecoration: 'none' }}>
          Đặt Món
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-on-surface)',
            cursor: 'pointer',
            width: 44,
            height: 44,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex flex-col items-center" style={{ gap: '2.5rem' }}>
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  fontSize: '18px',
                  letterSpacing: '0.15em',
                  color: location.pathname === link.to
                    ? 'var(--color-terracotta)'
                    : 'var(--color-ivory)',
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  animation: `fadeInUp 0.4s ${i * 60}ms both`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dat-mon"
              className="btn-primary"
              style={{
                textDecoration: 'none',
                marginTop: '1rem',
                animation: `fadeInUp 0.4s ${navLinks.length * 60}ms both`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Đặt Món
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
