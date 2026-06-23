import { useState, useCallback, useEffect } from 'react';
import { api } from '../lib/api';
import type { MenuItem, Category } from '../lib/api';
import { SkeletonCard } from '../components/Skeleton';

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

export default function OrderForm() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMenu().then(({ categories: cats, items }) => {
      setMenuItems(items);
      setCategories(cats);
      if (cats.length > 0) setActiveCategory(cats[0].id);
      setLoading(false);
    }).catch(err => {
      console.error('OrderForm: Failed to load menu', err);
      setLoading(false);
    });
  }, []);

  const addToCart = useCallback((id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  }, []);

  const clearItem = useCallback((id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  }, []);

  const cartItems = menuItems.filter(item => cart[item.id]);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0);

  // Filter by category_id directly (no hardcoded mapping needed)
  const filtered = menuItems.filter(item => item.category_id === activeCategory);

  const handleSubmit = async () => {
    if (total === 0 || !customerInfo.name || !customerInfo.phone) return;
    setSubmitting(true);
    setError('');

    try {
      const orderItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: cart[item.id] || 0,
      }));

      const result = await api.submitOrder({
        items: orderItems,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        notes: customerInfo.notes,
        total,
      });

      setOrderSuccess(result.order_id);
      setCart({});
      setCustomerInfo({ name: '', phone: '', notes: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đặt hàng thất bại.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <section className="container-narrow section-padding" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div
          className="double-bezel"
          style={{ borderRadius: '2rem', maxWidth: '32rem', margin: '0 auto' }}
        >
          <div className="double-bezel-inner" style={{ borderRadius: 'calc(2rem - 6px)', padding: 'clamp(2rem, 5vw, 4rem)' }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 80, color: 'var(--color-terracotta)', marginBottom: '1.5rem', display: 'block' }}
            >
              check_circle
            </span>
            <h2 style={{ color: 'var(--color-ivory)', marginBottom: '1rem' }}>Đặt Hàng Thành Công!</h2>
            <p style={{ color: 'var(--color-ash)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              Đơn hàng của bạn đã được ghi nhận.
            </p>
            <p className="mono-data" style={{ color: 'var(--color-terracotta)', marginBottom: '2rem' }}>
              Mã đơn: {orderSuccess}
            </p>
            <button className="btn-primary" onClick={() => setOrderSuccess(null)}>
              Đặt thêm
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Page Header */}
      <header className="container-narrow" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-ivory)', marginBottom: '1rem' }}>Đặt Món</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)' }}>
          Chọn món yêu thích và chúng tôi sẽ chuẩn bị cho bạn.
        </p>
      </header>

      {/* Main Layout */}
      <div className="container-narrow" style={{ paddingBottom: '6rem' }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}
        >
          {/* Left: Menu Items (7 cols) */}
          <div className="lg:col-span-7">
            {/* Category Tabs */}
            <div
              className="no-scrollbar"
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                marginBottom: '2rem',
                paddingBottom: '0.5rem',
                scrollbarWidth: 'none',
              }}
            >
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Item Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-ash)' }}>
                  Chưa có sản phẩm trong danh mục này.
                </div>
              ) : (
                filtered.map(item => {
                  const qty = cart[item.id] || 0;
                  const isInCart = qty > 0;

                  return (
                    <div
                      key={item.id}
                      className="double-bezel spring-hover"
                      style={{
                        borderRadius: '1rem',
                        transition: 'all 0.3s ease',
                        ...(isInCart ? { boxShadow: '0 0 0 1px rgba(194, 112, 58, 0.3)' } : {}),
                      }}
                    >
                      <div
                        className="double-bezel-inner"
                        style={{
                          borderRadius: 'calc(1rem - 6px)',
                          padding: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.25rem',
                        }}
                      >
                        {/* Thumbnail */}
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-ivory)', marginBottom: '0.25rem' }}>
                            {item.name}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              color: 'var(--color-ash)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.description}
                          </p>
                          <span className="mono-data" style={{ color: 'var(--color-terracotta)', fontSize: '1rem' }}>
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        {/* Quantity Control */}
                        <div style={{ flexShrink: 0 }}>
                          {isInCart ? (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0,
                                borderRadius: '10px',
                                border: '1px solid rgba(194, 112, 58, 0.3)',
                                overflow: 'hidden',
                                background: 'var(--color-charcoal)',
                              }}
                            >
                              <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--color-terracotta)',
                                  cursor: 'pointer',
                                  fontSize: '1.25rem',
                                  fontWeight: 600,
                                }}
                              >
                                −
                              </button>
                              <span
                                style={{
                                  width: '32px',
                                  textAlign: 'center',
                                  color: 'var(--color-ivory)',
                                  fontWeight: 600,
                                  fontSize: '1rem',
                                }}
                              >
                                {qty}
                              </span>
                              <button
                                onClick={() => addToCart(item.id)}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--color-terracotta)',
                                  cursor: 'pointer',
                                  fontSize: '1.25rem',
                                  fontWeight: 600,
                                }}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item.id)}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--color-charcoal)',
                                border: '1px solid var(--color-surface-variant)',
                                color: 'var(--color-terracotta)',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-terracotta)';
                                (e.currentTarget as HTMLElement).style.background = 'rgba(194, 112, 58, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-surface-variant)';
                                (e.currentTarget as HTMLElement).style.background = 'var(--color-charcoal)';
                              }}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Cart Panel (5 cols, sticky) */}
          <div className="lg:col-span-5" style={{ position: 'sticky', top: '96px' }}>
            <div
              className="double-bezel"
              style={{ borderRadius: '1.5rem' }}
            >
              <div
                className="double-bezel-inner"
                style={{
                  borderRadius: 'calc(1.5rem - 6px)',
                  overflow: 'hidden',
                  maxHeight: 'calc(100vh - 120px)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Cart Header */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--color-surface-variant)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--color-ivory)' }}>Đơn Hàng</h2>
                  {totalItems > 0 && (
                    <span
                      style={{
                        background: 'var(--color-terracotta)',
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '0.125rem 0.625rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </div>

                {/* Cart Items */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    flex: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 48, color: 'var(--color-surface-variant)', marginBottom: '1rem', display: 'block' }}
                      >
                        shopping_bag
                      </span>
                      <p style={{ color: 'var(--color-ash)', fontSize: '0.9375rem' }}>
                        Chưa có món nào. Hãy chọn từ danh sách bên trái.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {cartItems.map(item => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            background: 'rgba(45, 36, 24, 0.3)',
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ color: 'var(--color-ivory)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                              {item.name}
                            </h4>
                            <span style={{ color: 'var(--color-ash)', fontSize: '0.8125rem' }}>
                              ×{cart[item.id]} · {formatPrice(item.price * (cart[item.id] || 0))}
                            </span>
                          </div>
                          <button
                            onClick={() => clearItem(item.id)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent',
                              border: '1px solid rgba(194, 112, 58, 0.2)',
                              color: 'var(--color-ash)',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = '#ef4444';
                              (e.currentTarget as HTMLElement).style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(194, 112, 58, 0.2)';
                              (e.currentTarget as HTMLElement).style.color = 'var(--color-ash)';
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer — Total + Form + Submit */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid var(--color-surface-variant)',
                    background: 'rgba(20, 17, 14, 0.5)',
                  }}
                >
                  {/* Total */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-ash)' }}>Tạm tính</span>
                    <span
                      className="mono-data"
                      style={{
                        color: 'var(--color-terracotta)',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>

                  {error && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(220, 38, 38, 0.1)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      color: '#fca5a5',
                      fontSize: '0.8125rem',
                      marginBottom: '1rem',
                    }}>
                      {error}
                    </div>
                  )}

                  {/* Customer Form */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <input
                      className="form-input"
                      placeholder="Họ tên *"
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      style={{ padding: '0.75rem 1rem', fontSize: '0.9375rem' }}
                    />
                    <input
                      className="form-input"
                      placeholder="Số điện thoại *"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      style={{ padding: '0.75rem 1rem', fontSize: '0.9375rem' }}
                    />
                    <textarea
                      className="form-input"
                      placeholder="Ghi chú (Tùy chọn)"
                      rows={2}
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      style={{ padding: '0.75rem 1rem', fontSize: '0.9375rem', resize: 'none' }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={total === 0 || submitting || !customerInfo.name || !customerInfo.phone}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '1rem 2rem',
                      opacity: (total === 0 || !customerInfo.name || !customerInfo.phone) ? 0.5 : 1,
                      cursor: (total === 0 || submitting) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {submitting ? 'Đang xử lý...' : 'Xác Nhận Đơn Hàng'}
                    {!submitting && (
                      <span className="material-symbols-outlined" style={{ fontSize: 18, marginLeft: '0.5rem' }}>arrow_forward</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
