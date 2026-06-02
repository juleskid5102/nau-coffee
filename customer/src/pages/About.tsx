import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { TeamMember, BrandValue, SiteSettings } from '../lib/api';
import { SkeletonBlock, SkeletonText } from '../components/Skeleton';

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<BrandValue[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAbout(),
      api.getSiteSettings(),
    ]).then(([about, s]) => {
      setTeam(about.team);
      setValues(about.values);
      setSettings(s);
      setLoading(false);
    }).catch(err => {
      console.error('About: Failed to load data', err);
      setLoading(false);
    });
  }, []);

  const founder = team[0];

  return (
    <>
      {/* Hero Section — 45/55 split */}
      <section className="section-padding container-narrow" style={{ paddingTop: '2rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}>
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '2rem' }}>
            <h1 style={{ color: 'var(--color-ivory)' }}>Câu Chuyện Nâu</h1>
            <p style={{ fontSize: '1.125rem' }}>
              {settings?.story_text || 'Khởi nguồn từ niềm đam mê mãnh liệt với những hạt cà phê Việt, Nâu là hành trình tìm kiếm và lưu giữ những giá trị nguyên bản nhất.'}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner"
                style={{
                  borderRadius: 'calc(2rem - 6px)',
                  height: 'clamp(400px, 60vh, 80vh)',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/coffee-roasting.jpg"
                  alt="Quá trình rang cà phê"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section — centered editorial */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) var(--spacing-gutter)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: 'var(--color-ivory)',
              marginBottom: '3rem',
              lineHeight: 1.15,
            }}
          >
            "{settings?.philosophy_quote || 'Mỗi mẻ rang là một tác phẩm nghệ thuật.'}"
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.8 }}>
            {settings?.philosophy_text || ''}
          </p>
        </div>
      </section>

      {/* Values Section — 8/4 asymmetric */}
      <section className="section-padding container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: '3rem' }}>
          <div className="md:col-span-8">
            <div style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--color-warm-slate)' }}>
              <img
                src="/images/barista-pourover.jpg"
                alt="Barista pha chế"
                style={{ width: '100%', height: 'clamp(300px, 50vh, 60vh)', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col" style={{ gap: '3rem' }}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start" style={{ gap: '1.5rem' }}>
                  <SkeletonBlock style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <SkeletonBlock style={{ height: '20px', width: '60%', marginBottom: '0.75rem', borderRadius: '6px' }} />
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))
            ) : (
              values.map((v) => (
                <div key={v.id} className="flex items-start" style={{ gap: '1.5rem' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--color-charcoal)',
                      border: '1px solid rgba(76, 70, 64, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-terracotta)' }}>{v.icon}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>{v.title}</h3>
                    <p style={{ color: 'var(--color-ash)', fontSize: '1rem' }}>{v.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding container-narrow" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-ivory)', marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>Người Truyền Lửa</h2>
        {founder ? (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
            {/* Founder card */}
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner flex flex-col items-center"
                style={{
                  borderRadius: 'calc(2rem - 6px)',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 192,
                    height: 192,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '2rem',
                    border: '4px solid var(--color-deep-roast)',
                  }}
                >
                  <img
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>{founder.name}</h3>
                <p className="label-caps" style={{ color: 'var(--color-terracotta)', fontSize: '13px' }}>{founder.role}</p>
              </div>
            </div>

            {/* Quote card */}
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner flex flex-col items-center justify-center"
                style={{
                  borderRadius: 'calc(2rem - 6px)',
                  padding: '2rem',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <p style={{ fontStyle: 'italic', color: 'var(--color-ash)', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '20rem' }}>
                  "{founder.quote}"
                </p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <SkeletonBlock style={{ height: '300px', borderRadius: '2rem' }} />
          </div>
        ) : null}
      </section>

      {/* CTA */}
      <section
        className="flex flex-col items-center justify-center"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) var(--spacing-gutter)',
          textAlign: 'center',
          borderTop: '1px solid rgba(76, 70, 64, 0.1)',
          background: 'var(--color-surface-container)',
        }}
      >
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--color-ivory)', marginBottom: '3rem' }}>
          Hãy đến và cảm nhận
        </h2>
        <a
          href="/lien-he"
          className="btn-primary"
          style={{
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(194, 112, 58, 0.2)',
          }}
        >
          Liên Hệ Chúng Tôi
        </a>
      </section>
    </>
  );
}
