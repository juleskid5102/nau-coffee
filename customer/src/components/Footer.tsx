import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-surface-variant)',
        background: 'var(--color-deep-roast)',
        padding: '5rem 0',
      }}
    >
      <div className="container-narrow">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
          style={{ gap: '2rem' }}
        >
          {/* Brand */}
          <Link
            to="/"
            className="nav-logo"
            style={{ textDecoration: 'none', fontSize: '32px' }}
          >
            NÂU
          </Link>

          {/* Social Links */}
          <div className="flex items-center" style={{ gap: '1.5rem' }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps"
              style={{
                color: 'var(--color-ash)',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-ember)';
                (e.target as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-ash)';
                (e.target as HTMLElement).style.opacity = '0.8';
              }}
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps"
              style={{
                color: 'var(--color-ash)',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-ember)';
                (e.target as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-ash)';
                (e.target as HTMLElement).style.opacity = '0.8';
              }}
            >
              Facebook
            </a>
          </div>

          {/* Copyright */}
          <div className="mono-data" style={{ color: 'var(--color-ash)' }}>
            © 2024 NÂU COFFEE. THE QUIET RITUAL.
          </div>
        </div>
      </div>
    </footer>
  );
}
