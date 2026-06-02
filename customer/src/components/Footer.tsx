import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { SiteSettings } from '../lib/api';

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    api.getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: settings?.social_instagram || 'https://instagram.com' },
    { name: 'Facebook', url: settings?.social_facebook || 'https://facebook.com' },
  ];

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
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
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
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="mono-data" style={{ color: 'var(--color-ash)' }}>
            © {new Date().getFullYear()} NÂU COFFEE. THE QUIET RITUAL.
          </div>
        </div>
      </div>
    </footer>
  );
}
