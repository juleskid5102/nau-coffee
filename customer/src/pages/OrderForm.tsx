import { useState, useCallback } from 'react';
import { Reveal } from '../components/Reveal';

interface OrderItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
}

const orderMenuItems: OrderItem[] = [
  { id: 1, name: 'Cà Phê Muối', desc: 'Gourmet Vietnamese Salt Coffee', price: 55000, image: '/images/menu/ca-phe-muoi.jpg', category: 'Cà Phê' },
  { id: 2, name: 'Bạc Xỉu', desc: 'Classic condensed milk layers', price: 45000, image: '/images/menu/bac-xiu.jpg', category: 'Cà Phê' },
  { id: 3, name: 'Cold Brew', desc: 'Minimalist clear ice texture', price: 65000, image: '/images/menu/cold-brew.jpg', category: 'Cà Phê' },
  { id: 4, name: 'Cà Phê Trứng', desc: 'Traditional egg foam top', price: 60000, image: '/images/menu/ca-phe-trung.jpg', category: 'Cà Phê' },
  { id: 5, name: 'Trà Sen', desc: 'Premium Lotus Tea glass', price: 50000, image: '/images/menu/tra-sen.jpg', category: 'Trà' },
  { id: 6, name: 'Matcha Latte', desc: 'Latte art dark ceramic', price: 55000, image: '/images/menu/matcha-latte.jpg', category: 'Trà' },
  { id: 7, name: 'Bánh Croissant', desc: 'Freshly baked pastry', price: 35000, image: '/images/gallery/03-beans.jpg', category: 'Bánh Ngọt' },
];

const categories = ['Cà Phê', 'Trà', 'Đá Xay', 'Bánh Ngọt'];

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

export default function OrderForm() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState('Cà Phê');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', notes: '' });

  const addToCart = useCallback((id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  }, []);

  const cartItems = orderMenuItems.filter(item => cart[item.id]);
  const total = cartItems.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0);

  const filteredItems = orderMenuItems.filter(item => item.category === activeCategory);

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        {/* Left Panel: Menu (60%) — from Stitch */}
        <div className="w-full lg:w-3/5 pb-12 lg:pb-0">
          <Reveal>
            <header className="mb-10">
              <h1 className="text-5xl md:text-6xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                Đặt Món
              </h1>
              <p className="text-lg font-light max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                Chọn món yêu thích và chúng tôi sẽ chuẩn bị cho bạn.
              </p>
            </header>
          </Reveal>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 mb-10 pb-2" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'var(--color-surface-card)' : 'transparent',
                  color: activeCategory === cat ? '#F5ECD7' : 'var(--color-text-muted)',
                  border: activeCategory === cat ? '1px solid var(--color-caramel)' : '1px solid transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Item Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map(item => {
              const qty = cart[item.id] || 0;
              const isInCart = qty > 0;

              return (
                <Reveal key={item.id}>
                  <div
                    className="group rounded-2xl p-3 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                    style={{
                      background: 'var(--color-surface-card)',
                      border: `1px solid ${isInCart ? 'rgba(196,144,61,0.3)' : 'rgba(45,36,24,0.5)'}`,
                    }}
                  >
                    {isInCart && (
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(196,144,61,0.05), transparent)' }} />
                    )}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ background: 'var(--color-espresso)' }}>
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} loading="lazy" />
                    </div>
                    <div className="flex-grow min-w-0 py-1">
                      <h3 className="font-medium text-lg truncate mb-1" style={{ color: '#F5ECD7' }}>{item.name}</h3>
                      <p className="text-sm font-light truncate" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                      <p className="font-semibold mt-1" style={{ color: 'var(--color-caramel)' }}>{formatPrice(item.price)}</p>
                    </div>
                    <div className="shrink-0 pr-2">
                      {isInCart ? (
                        <div className="flex items-center rounded-lg h-10" style={{ background: 'var(--color-espresso)', border: '1px solid rgba(196,144,61,0.3)' }}>
                          <button onClick={() => removeFromCart(item.id)} className="w-8 h-full flex items-center justify-center transition-colors" style={{ color: 'var(--color-text-muted)' }}>−</button>
                          <span className="w-6 text-center font-medium text-sm">{qty}</span>
                          <button onClick={() => addToCart(item.id)} className="w-8 h-full flex items-center justify-center transition-colors" style={{ color: 'var(--color-text-muted)' }}>+</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 text-lg"
                          style={{ background: 'var(--color-espresso)', color: 'var(--color-caramel)', border: '1px solid rgba(196,144,61,0.2)' }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Sticky Cart (40%) — from Stitch */}
        <div className="w-full lg:w-2/5 lg:sticky" style={{ top: '96px', zIndex: 10 }}>
          <div
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid rgba(45,36,24,0.5)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            <div className="p-6 md:p-8 flex-shrink-0" style={{ borderBottom: '1px solid var(--color-espresso)' }}>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Đơn Hàng Của Bạn</h2>
            </div>

            {/* Order Items */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow" style={{ scrollbarWidth: 'thin' }}>
              {cartItems.length === 0 ? (
                <p className="text-center font-light" style={{ color: 'var(--color-text-muted)' }}>Chưa có món nào</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium" style={{ color: '#F5ECD7' }}>{item.name}</h4>
                        <div className="text-sm mt-1 font-light" style={{ color: 'var(--color-text-muted)' }}>x{cart[item.id]}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium" style={{ color: 'var(--color-caramel)' }}>{formatPrice(item.price * (cart[item.id] || 0))}</div>
                        <button
                          onClick={() => setCart(prev => { const n = { ...prev }; delete n[item.id]; return n; })}
                          className="text-xs mt-1 underline opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Form & Total */}
            <div className="p-6 md:p-8 flex-shrink-0" style={{ background: '#251D14', borderTop: '1px solid var(--color-espresso)' }}>
              <div className="flex justify-between items-end mb-6">
                <span className="font-light" style={{ color: 'var(--color-text-muted)' }}>Tạm tính</span>
                <span className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-caramel)' }}>
                  {formatPrice(total)}
                </span>
              </div>
              <form className="space-y-4 mb-6">
                <input
                  className="w-full rounded-lg px-4 py-3 font-light transition-colors focus:outline-none"
                  style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(138,126,110,0.3)', color: '#F5ECD7' }}
                  placeholder="Họ tên" type="text" name="name"
                  value={customerInfo.name} onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <input
                  className="w-full rounded-lg px-4 py-3 font-light transition-colors focus:outline-none"
                  style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(138,126,110,0.3)', color: '#F5ECD7' }}
                  placeholder="Số điện thoại" type="tel" name="phone"
                  value={customerInfo.phone} onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
                <textarea
                  className="w-full rounded-lg px-4 py-3 font-light transition-colors focus:outline-none resize-none"
                  style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(138,126,110,0.3)', color: '#F5ECD7' }}
                  placeholder="Ghi chú (Tùy chọn)" rows={2} name="notes"
                  value={customerInfo.notes} onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                />
              </form>
              <button
                type="button"
                className="w-full py-4 rounded-lg font-semibold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: total > 0 ? 'var(--color-caramel)' : 'rgba(196,144,61,0.3)',
                  color: 'var(--color-espresso)',
                  boxShadow: total > 0 ? '0 10px 25px -5px rgba(196,144,61,0.3)' : 'none',
                  cursor: total > 0 ? 'pointer' : 'not-allowed',
                }}
                disabled={total === 0}
              >
                Xác Nhận Đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
