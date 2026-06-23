import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { MenuItem, Category } from '../lib/api';
import { SkeletonMenuGrid } from '../components/Skeleton';

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

export default function Menu() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const categoryBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getMenu().then(({ categories: cats, items }) => {
      setCategories(cats);
      setMenuItems(items);
      setLoading(false);
    }).catch(err => {
      console.error('Menu: Failed to load data', err);
      setLoading(false);
    });
  }, []);

  // Prevent mouse wheel from scrolling the category bar horizontally
  useEffect(() => {
    const el = categoryBarRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      // Don't capture vertical scroll — let page scroll normally
      e.stopPropagation();
    };
    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const categoryNames = ['Tất Cả', ...categories.map(c => c.name)];

  const filtered = activeCategory === 'Tất Cả'
    ? menuItems
    : menuItems.filter((item) => {
        const cat = categories.find(c => c.id === item.category_id);
        return cat?.name === activeCategory;
      });

  const handleAddToCart = (item: MenuItem) => {
    // Show feedback animation
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);

    // Navigate to order page (the actual cart lives there)
    // For now, show a toast-like visual feedback
  };

  return (
    <>
      {/* Page Header */}
      <header className="container-narrow" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>Thực Đơn</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)' }}>
          Mỗi ly cà phê là một tác phẩm được chế tác tỉ mỉ.
        </p>
      </header>

      {/* Sticky Category Bar — fixed: no horizontal wheel capture */}
      <div
        style={{
          position: 'sticky',
          top: 80,
          zIndex: 40,
          background: 'rgba(20, 17, 14, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-surface-variant)',
          padding: '1rem var(--spacing-gutter)',
          marginBottom: '4rem',
        }}
      >
        <div
          ref={categoryBarRef}
          className="container-narrow flex items-center no-scrollbar"
          style={{
            gap: '0.75rem',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: 0,
            scrollbarWidth: 'none',
          }}
        >
          {categoryNames.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container-narrow" style={{ paddingBottom: 'var(--spacing-section)' }}>
        {loading ? (
          <SkeletonMenuGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: '1.5rem' }}>
            {filtered.map((item) => {
              const justAdded = addedItems[item.id];

              return (
                <article
                  key={item.id}
                  className={item.wide ? 'col-span-1 md:col-span-8' : 'col-span-1 md:col-span-4'}
                >
                  <div className="double-bezel spring-hover" style={{ borderRadius: '1rem', height: '100%' }}>
                    <div
                      className="double-bezel-inner"
                      style={{
                        borderRadius: 'calc(1rem - 6px)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: item.wide ? 'row' : 'column',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: item.wide ? '50%' : '100%',
                          aspectRatio: item.wide ? 'auto' : '4/3',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.7s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.transform = 'scale(1)';
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          width: item.wide ? '50%' : '100%',
                          padding: item.wide ? '2rem' : '1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          background: 'var(--color-charcoal)',
                        }}
                      >
                        <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: item.wide ? '32px' : '24px' }}>{item.name}</h3>
                          <span className="mono-data" style={{ color: 'var(--color-terracotta)' }}>{formatPrice(item.price)}</span>
                        </div>
                        <p className="line-clamp-2" style={{ color: 'var(--color-ash)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                          {item.description}
                        </p>

                        {/* CTA — show for ALL items */}
                        <div className="flex" style={{ gap: '0.75rem' }}>
                          <button
                            className="btn-ghost"
                            onClick={() => handleAddToCart(item)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              padding: '12px',
                              transition: 'all 0.3s ease',
                              ...(justAdded ? {
                                background: 'rgba(194, 112, 58, 0.15)',
                                borderColor: 'var(--color-terracotta)',
                                color: 'var(--color-terracotta)',
                              } : {}),
                            }}
                          >
                            {justAdded ? (
                              <>
                                <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: '0.5rem' }}>check</span>
                                Đã thêm!
                              </>
                            ) : (
                              'Thêm vào giỏ'
                            )}
                          </button>
                          <button
                            className="btn-primary"
                            onClick={() => navigate('/dat-mon')}
                            style={{
                              padding: '12px 20px',
                              fontSize: '0.875rem',
                            }}
                          >
                            Đặt ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating CTA — bottom bar linking to order page */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(20, 17, 14, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--color-surface-variant)',
          padding: '1rem var(--spacing-gutter)',
        }}
      >
        <div className="container-narrow flex items-center justify-between">
          <div>
            <p style={{ color: 'var(--color-ivory)', fontWeight: 500 }}>Sẵn sàng đặt hàng?</p>
            <p style={{ color: 'var(--color-ash)', fontSize: '0.875rem' }}>Chọn món và thanh toán nhanh chóng</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate('/dat-mon')}
            style={{ textDecoration: 'none', padding: '0.875rem 2rem' }}
          >
            Đặt Món
            <span className="material-symbols-outlined" style={{ fontSize: 18, marginLeft: '0.5rem' }}>arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bottom spacer to prevent content being hidden by fixed bar */}
      <div style={{ height: '80px' }} />
    </>
  );
}
