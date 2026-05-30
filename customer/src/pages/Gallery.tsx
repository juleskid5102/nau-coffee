import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

const galleryItems = [
  { id: 1, src: '/images/gallery/01-barista.jpg', alt: 'Barista at work', label: 'Quầy Pha Chế' },
  { id: 2, src: '/images/gallery/02-roasting.jpg', alt: 'Roasting process', label: 'Xưởng Rang' },
  { id: 3, src: '/images/gallery/03-beans.jpg', alt: 'Coffee beans', label: 'Hạt Cà Phê Mộc' },
  { id: 4, src: '/images/gallery/04-pourover.jpg', alt: 'Pour over', label: 'Nghệ Thuật Pour Over' },
  { id: 5, src: '/images/gallery/05-matcha.jpg', alt: 'Matcha', label: 'Góc Thưởng Thức' },
  { id: 6, src: '/images/gallery/06-drip.jpg', alt: 'Coffee drip', label: 'Phin Truyền Thống' },
  { id: 7, src: '/images/gallery/07-salt.jpg', alt: 'Salt coffee', label: 'Sáng Tạo Mới' },
  { id: 8, src: '/images/gallery/08-highlands.jpg', alt: 'Highlands', label: 'Nguồn Gốc Cầu Đất' },
  { id: 9, src: '/images/gallery/09-coldbrew.jpg', alt: 'Cold brew', label: 'Cold Brew' },
  { id: 10, src: '/images/gallery/10-egg.jpg', alt: 'Egg coffee', label: 'Đặc Sản Hà Nội' },
  { id: 11, src: '/images/gallery/11-minimalist.jpg', alt: 'Minimalist', label: 'Tinh Tế' },
  { id: 12, src: '/images/gallery/12-lotus.jpg', alt: 'Lotus tea', label: 'Thanh Tao' },
];

export default function Gallery() {
  return (
    <>
      {/* Page Header — from Stitch */}
      <header className="flex flex-col justify-center px-8 max-w-7xl mx-auto w-full pt-16"
        style={{ height: '30vh', minHeight: '300px' }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Không Gian Nâu
        </h1>
        <p className="text-xl font-light max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
          Nơi mỗi góc đều kể câu chuyện riêng.
        </p>
      </header>

      {/* Masonry Gallery Grid — from Stitch */}
      <main className="px-8 max-w-7xl mx-auto w-full py-16">
        <div className="masonry-grid">
          {galleryItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <div className="masonry-item relative group overflow-hidden rounded-2xl cursor-pointer">
                <img
                  alt={item.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  src={item.src}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                  style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.9) 0%, transparent 100%)' }}
                >
                  <span className="uppercase tracking-widest text-sm" style={{ color: '#F5ECD7' }}>
                    {item.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      {/* Atmosphere Quote — from Stitch */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ padding: '8rem 0' }}>
        <div className="absolute inset-0 z-0">
          <img
            alt="Café interior"
            className="w-full h-full object-cover opacity-30"
            src="/images/gallery/01-barista.jpg"
            style={{ filter: 'blur(4px) grayscale(50%) sepia(20%)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(26,18,8,0.8)', mixBlendMode: 'multiply' }} />
        </div>
        <Reveal>
          <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
            <h2
              className="italic text-3xl md:text-5xl leading-tight font-normal"
              style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
            >
              "Đến Nâu, bạn không chỉ uống cà phê —<br className="hidden md:block" />
              bạn trải nghiệm một khoảng lặng."
            </h2>
          </div>
        </Reveal>
      </section>

      {/* Visit CTA — from Stitch */}
      <section className="px-8 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center" style={{ padding: '6rem 2rem' }}>
        <Reveal>
          <div>
            <h3 className="text-4xl mb-8 font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
              Ghé Thăm Chúng Tôi
            </h3>
            <div className="space-y-6 mb-10 font-light" style={{ color: 'var(--color-text-muted)' }}>
              <div className="flex items-start">
                <span className="mr-4 mt-1" style={{ color: 'var(--color-caramel)' }}>📍</span>
                <div>
                  <p className="font-medium mb-1" style={{ color: '#F5ECD7' }}>Địa Chỉ</p>
                  <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-4 mt-1" style={{ color: 'var(--color-caramel)' }}>🕐</span>
                <div>
                  <p className="font-medium mb-1" style={{ color: '#F5ECD7' }}>Giờ Mở Cửa</p>
                  <p>7:00 — 22:00 hàng ngày</p>
                </div>
              </div>
            </div>
            <Link
              to="/lien-he"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--color-caramel)',
                color: 'var(--color-espresso)',
                boxShadow: '0 10px 25px -5px rgba(196,144,61,0.2)',
              }}
            >
              CHỈ ĐƯỜNG
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative h-96 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-surface-card)', background: 'var(--color-surface-card)' }}>
            <div
              className="absolute inset-0 flex items-center justify-center flex-col gap-2"
              style={{ background: 'rgba(45,36,24,0.5)' }}
            >
              <span className="text-4xl">📍</span>
              <p style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7', fontSize: '1.25rem' }}>Nâu Coffee</p>
              <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>123 Nguyễn Huệ, Quận 1</p>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.8), transparent)' }} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
