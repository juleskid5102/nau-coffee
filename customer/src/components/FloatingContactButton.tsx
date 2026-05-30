import { useState } from 'react';

const contactItems = [
  {
    id: 'phone',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Gọi ngay',
    href: 'tel:0901234567',
    color: '#4ade80',
  },
  {
    id: 'zalo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.02c-.243.468-.883.82-1.406.82H7.512c-.523 0-1.163-.352-1.406-.82l-.82-1.58a.456.456 0 01.406-.668h12.616c.321 0 .52.311.406.668l-.82 1.58zM17.5 13H6.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v5a.5.5 0 01-.5.5z" />
      </svg>
    ),
    label: 'Zalo',
    href: 'https://zalo.me/0901234567',
    color: '#0068ff',
  },
  {
    id: 'messenger',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.45 5.502 3.723 7.2V22l3.384-1.858A11.36 11.36 0 0012 20.485c5.523 0 10-4.144 10-9.242S17.523 2 12 2zm1.053 12.447l-2.553-2.723-4.982 2.723 5.482-5.818 2.614 2.723 4.921-2.723-5.482 5.818z" />
      </svg>
    ),
    label: 'Messenger',
    href: 'https://m.me/naucoffee',
    color: '#a855f7',
  },
];

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6" style={{ zIndex: 'var(--z-overlay)' }}>
      {/* Contact items */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {contactItems.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 no-underline"
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid rgba(168, 153, 126, 0.15)',
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
            }}
            aria-label={item.label}
          >
            <span style={{ color: item.color }}>{item.icon}</span>
            <span className="text-cream text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer border-none transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        style={{
          background: 'var(--color-caramel)',
          boxShadow: '0 4px 20px rgba(196, 144, 61, 0.4)',
        }}
        aria-label={isOpen ? 'Đóng liên hệ nhanh' : 'Liên hệ nhanh'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-espresso)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
