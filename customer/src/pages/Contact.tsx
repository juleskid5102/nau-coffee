import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { SiteSettings } from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    api.getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: 'location_on', label: 'Địa Chỉ', value: settings?.address || '123 Đường Cà Phê, Quận Trầm, TP.HCM' },
    { icon: 'phone', label: 'Điện Thoại', value: settings?.phone || '0901 234 567' },
    { icon: 'mail', label: 'Email', value: settings?.email || 'hello@naucoffee.vn' },
    { icon: 'schedule', label: 'Giờ Mở Cửa', value: settings?.hours || '07:00 - 22:00 mỗi ngày' },
  ];

  return (
    <>
      {/* Page Header */}
      <header className="container-narrow" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>Liên Hệ</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-on-surface-variant)' }}>
          Chúng tôi luôn sẵn lòng lắng nghe.
        </p>
      </header>

      {/* Contact Section — 45/55 split */}
      <section className="container-narrow" style={{ marginBottom: '5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}>
          {/* Left: Contact Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-center" style={{ gap: '3rem' }}>
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start" style={{ gap: '1.5rem' }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: 'var(--color-terracotta)', fontSize: 28, fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="label-caps" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '0.5rem' }}>
                    {item.label}
                  </h3>
                  <p style={{ color: 'var(--color-ivory)', fontSize: '1.125rem', fontWeight: 300 }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form (7 cols) */}
          <div className="md:col-span-7">
            <div className="double-bezel" style={{ borderRadius: '1.5rem' }}>
              <div
                className="double-bezel-inner"
                style={{ borderRadius: 'calc(1.5rem - 6px)', padding: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 64, color: 'var(--color-terracotta)', marginBottom: '1.5rem', display: 'block' }}
                    >
                      check_circle
                    </span>
                    <h3 style={{ color: 'var(--color-ivory)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                      Cảm ơn bạn!
                    </h3>
                    <p style={{ color: 'var(--color-ash)', marginBottom: '2rem' }}>
                      Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất.
                    </p>
                    <button
                      className="btn-ghost"
                      onClick={() => setSubmitted(false)}
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {error && (
                      <div style={{
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        color: '#fca5a5',
                        fontSize: '0.875rem',
                      }}>
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="contact-name" className="form-label">Họ và tên</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem' }}>
                      <div>
                        <label htmlFor="contact-email" className="form-label">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          className="form-input"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="form-label">Số điện thoại</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          className="form-input"
                          placeholder="090..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="form-label">Nội dung</label>
                      <textarea
                        id="contact-message"
                        className="form-input"
                        placeholder="Bạn muốn nhắn gửi điều gì?"
                        rows={5}
                        style={{ resize: 'none' }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem 2rem',
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                      {!submitting && (
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="container-narrow" style={{ marginBottom: 'var(--spacing-section)' }}>
        <div className="double-bezel" style={{ borderRadius: '2rem' }}>
          <div
            className="double-bezel-inner flex items-center justify-center"
            style={{
              borderRadius: 'calc(2rem - 6px)',
              height: 'clamp(300px, 40vh, 500px)',
              position: 'relative',
              background: 'var(--color-charcoal)',
            }}
          >
            <div
              style={{
                background: 'rgba(28, 25, 22, 0.8)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid rgba(76, 70, 64, 0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(194, 112, 58, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: 'var(--color-terracotta)', fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
              <div>
                <h4 className="label-caps" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '0.25rem' }}>
                  Nâu Coffee Roastery
                </h4>
                <p style={{ color: 'var(--color-ivory)', fontSize: '1rem' }}>
                  {settings?.address || '123 Đường Cà Phê, Quận Trầm, TP.HCM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
