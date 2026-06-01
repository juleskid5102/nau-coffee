import { useState } from 'react';
import { Link } from 'react-router-dom';

export function FloatingContactButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 45 }}>
      {/* Expanded panel */}
      {expanded && (
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 0,
            background: 'var(--color-charcoal)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: '1rem',
            padding: '1.5rem',
            minWidth: 220,
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="tel:0901234567"
              className="flex items-center"
              style={{
                gap: '0.75rem',
                color: 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-terracotta)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-ivory)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-terracotta)' }}>phone</span>
              0901 234 567
            </a>
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              style={{
                gap: '0.75rem',
                color: 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-terracotta)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-ivory)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-terracotta)' }}>chat</span>
              Zalo
            </a>
            <Link
              to="/lien-he"
              className="flex items-center"
              style={{
                gap: '0.75rem',
                color: 'var(--color-ivory)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.2s',
              }}
              onClick={() => setExpanded(false)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-terracotta)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-ivory)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-terracotta)' }}>mail</span>
              Liên Hệ
            </Link>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Liên hệ"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--color-terracotta)',
          color: 'var(--color-deep-roast)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(194, 112, 58, 0.3)',
          transition: 'all 0.3s var(--ease-spring-bounce)',
          transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-ember)';
          (e.currentTarget as HTMLElement).style.transform = expanded ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-terracotta)';
          (e.currentTarget as HTMLElement).style.transform = expanded ? 'rotate(45deg)' : 'rotate(0deg)';
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
          {expanded ? 'close' : 'chat_bubble'}
        </span>
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
