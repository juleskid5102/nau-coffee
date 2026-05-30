import { useState } from 'react';
import { Reveal } from '../components/Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'gop_y', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-16 lg:py-24">
        {/* Split Section — from Stitch contact.html */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
          {/* Left: Contact Info & Form (45%) */}
          <Reveal>
            <div className="lg:w-[45%] flex flex-col justify-center">
              <h1
                className="text-5xl lg:text-6xl mb-4 font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
              >
                Liên Hệ
              </h1>
              <p className="text-lg mb-10 font-light" style={{ color: 'var(--color-text-muted)' }}>
                Chúng tôi luôn sẵn lòng lắng nghe bạn.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                {[
                  { icon: '📍', label: 'Địa chỉ', value: '123 Nguyễn Huệ, Quận 1, TP.HCM' },
                  { icon: '📞', label: 'Điện thoại', value: '090 123 45 67' },
                  { icon: '✉️', label: 'Email', value: 'hello@naucoffee.vn' },
                  { icon: '🕐', label: 'Giờ mở cửa', value: '7:00 — 22:00, Tất cả các ngày' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <span className="mt-1 text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                        {item.label}
                      </p>
                      <p className="font-light" style={{ color: '#F5ECD7' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }} htmlFor="name">
                      Họ & Tên
                    </label>
                    <input
                      className="w-full rounded-lg px-4 py-3 font-light transition-all focus:outline-none"
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid var(--color-text-muted)',
                        color: '#F5ECD7',
                      }}
                      id="name" name="name" type="text" placeholder="Nguyễn Văn A"
                      value={formData.name} onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }} htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg px-4 py-3 font-light transition-all focus:outline-none"
                      style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-text-muted)', color: '#F5ECD7' }}
                      id="email" name="email" type="email" placeholder="email@example.com"
                      value={formData.email} onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }} htmlFor="subject">
                    Chủ Đề
                  </label>
                  <select
                    className="w-full rounded-lg px-4 py-3 font-light transition-all focus:outline-none appearance-none"
                    style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-text-muted)', color: '#F5ECD7' }}
                    id="subject" name="subject" value={formData.subject} onChange={handleChange}
                  >
                    <option value="gop_y">Góp ý</option>
                    <option value="hop_tac">Hợp tác</option>
                    <option value="dat_cho">Đặt chỗ</option>
                    <option value="khac">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }} htmlFor="message">
                    Nội Dung
                  </label>
                  <textarea
                    className="w-full rounded-lg px-4 py-3 font-light transition-all focus:outline-none resize-none"
                    style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-text-muted)', color: '#F5ECD7' }}
                    id="message" name="message" rows={4} placeholder="Hãy viết tin nhắn của bạn ở đây..."
                    value={formData.message} onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-caramel)',
                    color: 'var(--color-espresso)',
                    boxShadow: '0 4px 14px 0 rgba(196,144,61,0.39)',
                  }}
                >
                  Gửi Liên Hệ
                </button>
              </form>
            </div>
          </Reveal>

          {/* Right: Image (55%) */}
          <Reveal delay={0.2}>
            <div className="lg:w-[55%] h-[500px] lg:h-auto rounded-2xl overflow-hidden relative group">
              <img
                alt="Nâu Coffee Interior"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                src="/images/about/contact-barista.jpg"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.8), transparent, transparent)' }} />
            </div>
          </Reveal>
        </div>

        {/* Social Media */}
        <div className="flex justify-center items-center gap-8 mb-16">
          {['🌐', '📷', '▶️'].map((icon, i) => (
            <a
              key={i}
              href="#"
              className="text-3xl transition-colors duration-300 hover:scale-110 transform"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Map Section */}
        <div
          className="w-full h-[400px] rounded-2xl overflow-hidden relative flex items-center justify-center"
          style={{ border: '1px solid var(--color-surface-card)', background: 'var(--color-surface-card)' }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%)',
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-5xl mb-2" style={{ color: 'var(--color-caramel)' }}>📍</span>
            <p style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7', fontSize: '1.25rem' }}>Nâu Coffee</p>
            <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>123 Nguyễn Huệ, Quận 1</p>
          </div>
        </div>
      </main>
    </>
  );
}
