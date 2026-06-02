import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { api } from '../lib/api';
import type { SiteSettings, MenuItem, Testimonial } from '../lib/api';
import { SkeletonBlock } from '../components/Skeleton';

gsap.registerPlugin(ScrollTrigger);

const formatPrice = (price: number) => `${Math.round(price / 1000)}k`;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getSiteSettings(),
      api.getMenu(),
      api.getTestimonials(),
    ]).then(([s, menu, testimonials]) => {
      setSettings(s);
      setFeatured(menu.items.filter(i => i.featured).slice(0, 3));
      setTestimonial(testimonials[0] || null);
      setLoaded(true);
    }).catch(err => {
      console.error('Home: Failed to load data', err);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const reveals = [heroRef, menuRef, storyRef, quoteRef, ctaRef];
    reveals.forEach((ref) => {
      if (!ref.current) return;
      const children = ref.current.querySelectorAll('.reveal-item');
      gsap.fromTo(
        children,
        { y: 24, opacity: 0, filter: 'blur(4px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded]);

  // Loading state
  if (!loaded) {
    return (
      <div className="container-narrow section-padding" style={{ paddingTop: '4rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: '3rem' }}>
          <div className="md:col-span-5">
            <SkeletonBlock style={{ height: '180px', width: '80%', marginBottom: '1.5rem' }} />
            <SkeletonBlock style={{ height: '24px', width: '90%', marginBottom: '0.75rem' }} />
            <SkeletonBlock style={{ height: '52px', width: '180px', borderRadius: '999px', marginTop: '1.5rem' }} />
          </div>
          <div className="md:col-span-7">
            <SkeletonBlock style={{ height: '60vh', borderRadius: '2rem' }} />
          </div>
        </div>
      </div>
    );
  }

  const heroTitle = settings?.hero_title || 'Khoảnh khắc của sự tinh tế.';
  const heroSub = settings?.hero_subtitle || '';
  const heroCta = settings?.hero_cta || 'Khám Phá';
  const storyTitle = settings?.story_title || 'Câu Chuyện Nâu';
  const storyText = settings?.story_text || '';
  const mainFeatured = featured[0];
  const sideFeatured = featured.slice(1, 3);

  return (
    <>
      {/* HERO SECTION — 45/55 asymmetric split */}
      <header ref={heroRef} className="section-padding container-narrow" style={{ paddingTop: '2rem' }}>
        <div
          className="grid grid-cols-1 md:grid-cols-12 items-center"
          style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
        >
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '2rem' }}>
            <h1 className="reveal-item" style={{ color: 'var(--color-ivory)' }}>
              {heroTitle.split('.')[0]}.<br />{heroTitle.includes('.') ? '' : ''}
            </h1>
            <p className="reveal-item" style={{ fontSize: '1.125rem', maxWidth: '28rem' }}>
              {heroSub}
            </p>
            <Link to="/menu" className="btn-primary reveal-item" style={{ textDecoration: 'none' }}>
              {heroCta}
            </Link>
          </div>

          <div className="md:col-span-7 reveal-item" style={{ position: 'relative' }}>
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner"
                style={{
                  height: 'clamp(400px, 60vh, 80vh)',
                  position: 'relative',
                  borderRadius: 'calc(2rem - 6px)',
                }}
              >
                <img
                  src="/images/barista-pourover.jpg"
                  alt="Barista pha chế cà phê"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8,
                    mixBlendMode: 'luminosity',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--color-deep-roast), transparent)',
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURED MENU — asymmetric 7/5 grid */}
      <section
        ref={menuRef}
        className="section-padding container-narrow"
        style={{ borderTop: '1px solid var(--color-surface-variant)' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end reveal-item" style={{ marginBottom: '4rem', gap: '1.5rem' }}>
          <h2>Thực Đơn Nổi Bật</h2>
          <Link
            to="/menu"
            className="label-caps"
            style={{
              color: 'var(--color-terracotta)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Xem thực đơn đầy đủ
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-12"
          style={{ gap: '2rem', minHeight: '500px' }}
        >
          {/* Large card — 7 cols */}
          {mainFeatured && (
            <div className="md:col-span-7 reveal-item">
              <div className="double-bezel spring-hover" style={{ borderRadius: '1.5rem', height: '100%' }}>
                <div
                  className="double-bezel-inner"
                  style={{
                    borderRadius: 'calc(1.5rem - 6px)',
                    position: 'relative',
                    height: '100%',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                  }}
                >
                  <img
                    src={mainFeatured.image}
                    alt={mainFeatured.name}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.6,
                      transition: 'transform 1s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--color-deep-roast), rgba(20,17,14,0.5), transparent)',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 20 }}>
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 style={{ fontSize: '32px', marginBottom: '0.5rem' }}>{mainFeatured.name}</h3>
                        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem' }}>
                          {mainFeatured.description.slice(0, 80)}...
                        </p>
                      </div>
                      <span className="mono-data" style={{ color: 'var(--color-terracotta)', fontSize: '18px' }}>
                        {formatPrice(mainFeatured.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right stacked — 5 cols */}
          <div className="md:col-span-5 flex flex-col" style={{ gap: '2rem' }}>
            {sideFeatured.map((item) => (
              <div key={item.id} className="reveal-item" style={{ flex: 1 }}>
                <div className="double-bezel spring-hover" style={{ borderRadius: '1.5rem', height: '100%' }}>
                  <div
                    className="double-bezel-inner"
                    style={{
                      borderRadius: 'calc(1.5rem - 6px)',
                      position: 'relative',
                      height: '100%',
                      minHeight: '240px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.5rem',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.5,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, var(--color-deep-roast), transparent)',
                      }}
                    />
                    <div className="flex justify-between items-end" style={{ position: 'relative', zIndex: 20 }}>
                      <h3 style={{ fontSize: '24px' }}>{item.name}</h3>
                      <span className="mono-data" style={{ color: 'var(--color-terracotta)' }}>{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION — 40/60 split */}
      <section ref={storyRef} className="section-padding container-narrow">
        <div
          className="grid grid-cols-1 md:grid-cols-10 items-center"
          style={{ gap: '4rem' }}
        >
          <div className="md:col-span-4 flex flex-col items-start" style={{ gap: '2rem' }}>
            <h2 className="reveal-item">{storyTitle}</h2>
            <p className="reveal-item" style={{ fontSize: '1rem' }}>
              {storyText}
            </p>
            <Link to="/gioi-thieu" className="btn-ghost reveal-item" style={{ textDecoration: 'none' }}>
              Tìm Hiểu Thêm
            </Link>
          </div>

          <div className="md:col-span-6 reveal-item">
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner"
                style={{
                  borderRadius: 'calc(2rem - 6px)',
                  height: 'clamp(350px, 50vh, 70vh)',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/coffee-roasting.jpg"
                  alt="Rang cà phê"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — centered with ambient glow */}
      {testimonial && (
        <section
          ref={quoteRef}
          className="section-padding flex justify-center items-center"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(4rem, 10vw, 8rem) var(--spacing-gutter)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 600,
              background: 'rgba(194, 112, 58, 0.1)',
              borderRadius: '50%',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '48rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span
              className="reveal-item"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '120px',
                color: 'var(--color-surface-variant)',
                lineHeight: 1,
                position: 'absolute',
                top: '-3rem',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: 0.5,
              }}
            >
              "
            </span>
            <p
              className="reveal-item"
              style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                color: 'var(--color-ivory)',
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.5,
                marginBottom: '2rem',
                maxWidth: 'none',
              }}
            >
              {testimonial.content}
            </p>
            <div className="label-caps reveal-item" style={{ color: 'var(--color-terracotta)' }}>
              {testimonial.name} <span style={{ color: 'var(--color-ash)', margin: '0 0.5rem' }}>|</span> {testimonial.title}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section ref={ctaRef} className="container-narrow" style={{ marginBottom: '5rem' }}>
        <div className="double-bezel reveal-item" style={{ borderRadius: '2rem' }}>
          <div
            className="double-bezel-inner"
            style={{
              borderRadius: 'calc(2rem - 6px)',
              padding: 'clamp(2rem, 5vw, 5rem)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(194, 112, 58, 0.03)',
                mixBlendMode: 'overlay',
                borderRadius: 'inherit',
                pointerEvents: 'none',
              }}
            />

            <div
              className="flex flex-col md:flex-row items-center justify-between"
              style={{ gap: '3rem', position: 'relative', zIndex: 20 }}
            >
              <div>
                <h2 style={{ marginBottom: '2rem' }}>
                  Ghé thăm không gian<br />của chúng tôi
                </h2>
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  <div className="flex items-center" style={{ gap: '1rem' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-terracotta)' }}>location_on</span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>{settings?.address || '123 Đường Sách, Quận 1, TP. HCM'}</span>
                  </div>
                  <div className="flex items-center" style={{ gap: '1rem' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-terracotta)' }}>schedule</span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>{settings?.hours || '07:00 - 22:00 Mỗi ngày'}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/lien-he"
                className="btn-primary"
                style={{
                  textDecoration: 'none',
                  background: 'var(--color-ivory)',
                  color: 'var(--color-deep-roast)',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '2rem',
                }}
              >
                Xem bản đồ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
