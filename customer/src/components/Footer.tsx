import { Link } from 'react-router-dom';

const footerLinks = {
  explore: [
    { label: 'Menu', path: '/menu' },
    { label: 'Giới thiệu', path: '/gioi-thieu' },
    { label: 'Không gian', path: '/khong-gian' },
  ],
  service: [
    { label: 'Đặt món online', path: '/dat-mon' },
    { label: 'Tra cứu đơn', path: '/theo-doi-don/lookup' },
    { label: 'Liên hệ', path: '/lien-he' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-warm-800/50" style={{ background: 'var(--color-espresso-dark)' }}>
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="text-3xl tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              NÂU COFFEE
            </h3>
            <p className="text-warm-400 text-sm leading-relaxed max-w-sm">
              Nơi mỗi tách cà phê là một câu chuyện. Chúng tôi mang đến trải nghiệm
              cà phê thủ công đặc biệt, từ những hạt cà phê được chọn lọc kỹ lưỡng.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social icons */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-warm-700 flex items-center justify-center text-warm-400 hover:border-caramel hover:text-caramel transition-all duration-300"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-warm-700 flex items-center justify-center text-warm-400 hover:border-caramel hover:text-caramel transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-warm-700 flex items-center justify-center text-warm-400 hover:border-caramel hover:text-caramel transition-all duration-300"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.4a6.34 6.34 0 0011.14 4.17V13.2a8.16 8.16 0 005.3 1.93V11.7a4.85 4.85 0 01-3.77-1.55V6.69z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-cream mb-6"
                style={{ fontFamily: 'var(--font-body)' }}>
              Khám phá
            </h4>
            <ul className="list-none space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-warm-400 text-sm hover:text-caramel transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-cream mb-6"
                style={{ fontFamily: 'var(--font-body)' }}>
              Dịch vụ
            </h4>
            <ul className="list-none space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-warm-400 text-sm hover:text-caramel transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-warm-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-600 text-xs">
            © {new Date().getFullYear()} Nâu Coffee. All rights reserved.
          </p>
          <p className="text-warm-700 text-xs">
            Crafted with ☕ by Jules Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
