import { useState } from 'react';
import { Reveal } from '../components/Reveal';

// Menu data — matches Stitch design exactly
const menuCategories = ['Tất Cả', 'Cà Phê', 'Trà', 'Đá Xay', 'Bánh Ngọt'];

const menuItems = [
  {
    id: 1, name: 'Cà Phê Muối', price: '55.000đ', desc: 'Cà phê đen pha muối hồng, vị mặn nhẹ hòa quyện đắng sâu',
    image: '/images/menu/menu-caphe-muoi-wide.jpg', category: 'Cà Phê', layout: 'wide',
  },
  {
    id: 2, name: 'Bạc Xỉu', price: '45.000đ', desc: 'Cà phê sữa đặc truyền thống, ngọt thanh, thơm béo',
    image: '/images/menu/menu-bacxiu.jpg', category: 'Cà Phê', layout: 'narrow',
  },
  {
    id: 3, name: 'Cold Brew', price: '65.000đ', desc: 'Ủ lạnh 18 giờ, vị thanh, hậu ngọt tự nhiên',
    image: '/images/menu/cold-brew.jpg', category: 'Cà Phê', layout: 'narrow',
  },
  {
    id: 4, name: 'Cà Phê Trứng', price: '60.000đ', desc: 'Kem trứng béo mịn phủ trên nền cà phê nóng',
    image: '/images/menu/ca-phe-trung.jpg', category: 'Cà Phê', layout: 'wide-reverse',
  },
  {
    id: 5, name: 'Trà Sen', price: '50.000đ', desc: 'Trà xanh hương sen, thanh mát, thư giãn',
    image: '/images/menu/tra-sen.jpg', category: 'Trà', layout: 'wide',
  },
  {
    id: 6, name: 'Matcha Latte', price: '55.000đ', desc: 'Matcha Nhật Bản, sữa tươi, ít đường',
    image: '/images/menu/matcha-latte.jpg', category: 'Trà', layout: 'narrow',
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả');

  const filteredItems = activeCategory === 'Tất Cả'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Page Header — from Stitch */}
      <header className="w-full pt-20 pb-12 px-6 md:px-12 lg:px-24" style={{ background: 'var(--color-espresso)' }}>
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
          >
            Thực Đơn
          </h1>
          <p className="text-xl font-light max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            Mỗi ly cà phê là một tác phẩm được chế tác tỉ mỉ.
          </p>
        </div>
      </header>

      {/* Category Filter Bar (Sticky) — from Stitch */}
      <div
        className="sticky z-40 w-full py-4 px-6 md:px-12 lg:px-24"
        style={{
          top: '72px',
          background: 'rgba(26,18,8,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-surface-card)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-5 py-2 rounded-lg text-sm uppercase tracking-wider font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? 'var(--color-caramel)' : 'transparent',
                color: activeCategory === cat ? 'var(--color-espresso)' : 'var(--color-text-muted)',
                border: activeCategory === cat ? 'none' : '1px solid var(--color-surface-card)',
                fontWeight: activeCategory === cat ? 600 : 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid — Stitch asymmetric layout */}
      <section className="w-full py-16 px-6 md:px-12 lg:px-24" style={{ background: 'var(--color-espresso)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" style={{ gridAutoRows: '400px' }}>
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className={item.layout === 'narrow' ? 'md:col-span-1' : 'md:col-span-2'}>
              {item.layout === 'wide' ? (
                /* Wide card — 2 cols, horizontal split */
                <article
                  className="group relative rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-surface-card)',
                    height: '400px',
                  }}
                >
                  <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                    <img alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.image} loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.8), transparent)' }} />
                  </div>
                  <div className="p-8 flex flex-col justify-center w-full md:w-1/2 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-3xl leading-snug" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                        {item.name}
                      </h2>
                      <span className="font-semibold text-xl" style={{ color: 'var(--color-caramel)' }}>{item.price}</span>
                    </div>
                    <p className="font-light mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {item.desc}
                    </p>
                    <button className="mt-auto self-start px-6 py-2.5 rounded-lg text-sm uppercase tracking-wider font-medium transition-all duration-300 group-hover:text-[#1A1208]"
                      style={{
                        border: '1px solid var(--color-caramel)',
                        color: 'var(--color-caramel)',
                        background: 'transparent',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-caramel)'; e.currentTarget.style.color = '#1A1208'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-caramel)'; }}
                    >
                      Thêm vào
                    </button>
                  </div>
                </article>
              ) : item.layout === 'wide-reverse' ? (
                /* Wide card reversed — image on right */
                <article
                  className="group relative rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-surface-card)',
                    height: '400px',
                  }}
                >
                  <div className="p-8 flex flex-col justify-center w-full md:w-1/2 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-3xl leading-snug" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                        {item.name}
                      </h2>
                      <span className="font-semibold text-xl" style={{ color: 'var(--color-caramel)' }}>{item.price}</span>
                    </div>
                    <p className="font-light mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {item.desc}
                    </p>
                    <button className="mt-auto self-start px-6 py-2.5 rounded-lg text-sm uppercase tracking-wider font-medium transition-all duration-300"
                      style={{ border: '1px solid var(--color-caramel)', color: 'var(--color-caramel)', background: 'transparent' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-caramel)'; e.currentTarget.style.color = '#1A1208'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-caramel)'; }}
                    >
                      Thêm vào
                    </button>
                  </div>
                  <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden order-first md:order-last">
                    <img alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.image} loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, transparent, rgba(26,18,8,0.8))' }} />
                  </div>
                </article>
              ) : (
                /* Narrow card — 1 col */
                <article
                  className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-surface-card)',
                    height: '400px',
                  }}
                >
                  <div className="w-full h-48 relative overflow-hidden">
                    <img alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.image} loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-surface-card), transparent)' }} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10 -mt-8">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                        {item.name}
                      </h2>
                      <span className="font-semibold" style={{ color: 'var(--color-caramel)' }}>{item.price}</span>
                    </div>
                    <p className="font-light text-sm mb-6 flex-grow" style={{ color: 'var(--color-text-muted)' }}>
                      {item.desc}
                    </p>
                    <button className="w-full py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-all duration-300"
                      style={{ border: '1px solid var(--color-surface-card)', color: 'var(--color-text-muted)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-caramel)'; e.currentTarget.style.color = 'var(--color-caramel)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-surface-card)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      Thêm vào
                    </button>
                  </div>
                </article>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
