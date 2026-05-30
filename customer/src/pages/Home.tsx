import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '../components/Reveal';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = heroRef.current;
    if (!hero) return;

    gsap.to(hero.querySelector('.hero-bg'), {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const textEl = heroTextRef.current;
    if (textEl) {
      gsap.from(textEl.children, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ═══ HERO SECTION — Stitch layout: left-aligned text, gradient overlay ═══ */}
      <section
        ref={heroRef}
        className="relative flex items-center overflow-hidden"
        style={{ height: '90vh', minHeight: '600px' }}
      >
        <div className="hero-bg absolute inset-0 z-0">
          <img
            alt="Không gian pha chế Nâu Coffee"
            className="w-full h-full object-cover"
            src="/images/hero/hero-bg.jpg"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #1A1208, rgba(26,18,8,0.8), transparent)' }}
          />
        </div>

        <div ref={heroTextRef} className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="max-w-2xl">
            <h1
              className="text-5xl md:text-7xl mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
            >
              Khoảnh khắc của sự tinh tế.
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 leading-relaxed" style={{ color: 'rgba(245,236,215,0.9)' }}>
              Cà phê nguyên bản, rang mộc mỗi ngày.<br />
              Nơi mỗi giọt cà phê kể câu chuyện riêng.
            </p>
            <Link
              to="/menu"
              className="btn-primary text-lg px-8 py-4"
            >
              Khám Phá
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED MENU — Stitch layout: asymmetric 7/5 grid ═══ */}
      <section className="section-padding" style={{ background: 'var(--color-espresso)' }}>
        <div className="container-narrow">
          <Reveal>
            <div className="flex justify-between items-end mb-12">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
                Thực Đơn Nổi Bật
              </h2>
              <Link
                to="/menu"
                className="text-sm font-medium uppercase tracking-widest flex items-center gap-2"
                style={{ color: 'var(--color-caramel)' }}
              >
                Xem thực đơn đầy đủ
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Card (Left — 7 cols) */}
            <Reveal className="md:col-span-7">
              <div className="group cursor-pointer">
                <Link to="/menu/ca-phe-muoi" className="block no-underline">
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{
                      height: '500px',
                      background: 'var(--color-surface-card)',
                      border: '1px solid rgba(45,36,24,0.5)',
                    }}
                  >
                    <img
                      alt="Cà Phê Muối"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      src="/images/menu/ca-phe-muoi.jpg"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.9), rgba(26,18,8,0.2), transparent)' }}
                    />
                    <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                      <div>
                        <h3
                          className="text-3xl mb-2"
                          style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
                        >
                          Cà Phê Muối
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>
                          Sự cân bằng hoàn hảo giữa đắng và mặn béo
                        </p>
                      </div>
                      <span style={{ color: 'var(--color-caramel)', fontWeight: 600, fontSize: '1.25rem' }}>
                        55k
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>

            {/* Stacked Cards (Right — 5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <Reveal delay={0.1} className="flex-1">
                <Link to="/menu/bac-xiu" className="block no-underline group">
                  <div
                    className="rounded-2xl overflow-hidden flex-1 relative cursor-pointer"
                    style={{
                      height: '237px',
                      background: 'var(--color-surface-card)',
                      border: '1px solid rgba(45,36,24,0.5)',
                    }}
                  >
                    <img
                      alt="Bạc Xỉu"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      src="/images/menu/bac-xiu.jpg"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.9), rgba(26,18,8,0.3))' }}
                    />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                            Bạc Xỉu
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>
                            Ngọt ngào, nhẹ nhàng
                          </p>
                        </div>
                        <span style={{ color: 'var(--color-caramel)', fontWeight: 600, fontSize: '1.125rem' }}>45k</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.2}>
                <Link to="/menu/cold-brew" className="block no-underline group">
                  <div
                    className="rounded-2xl overflow-hidden flex-1 relative cursor-pointer"
                    style={{
                      height: '237px',
                      background: '#221a11',
                      border: '1px solid rgba(45,36,24,0.5)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(#C4903D 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                            Cold Brew
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>
                            Ủ lạnh 24 giờ
                          </p>
                        </div>
                        <span style={{ color: 'var(--color-caramel)', fontWeight: 600, fontSize: '1.125rem' }}>60k</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STORY SECTION — Stitch layout: 40/60 split ═══ */}
      <section className="section-padding" style={{ background: 'rgba(45,36,24,0.3)' }}>
        <div className="container-narrow">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center gap-16">
              {/* Text (Left 40%) */}
              <div className="w-full md:w-[40%]">
                <h2 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
                  Câu Chuyện Nâu
                </h2>
                <p className="font-light leading-relaxed mb-6" style={{ color: 'rgba(245,236,215,0.8)' }}>
                  Khởi nguồn từ niềm đam mê mãnh liệt với hạt cà phê Việt, Nâu không chỉ là một quán cà phê,
                  mà là một không gian tôn vinh nghệ thuật rang xay. Chúng tôi tin rằng mỗi mẻ rang là một
                  tác phẩm nghệ thuật, đòi hỏi sự kiên nhẫn và tĩnh lặng.
                </p>
                <p className="font-light leading-relaxed mb-10" style={{ color: 'rgba(245,236,215,0.8)' }}>
                  Trong không gian tối giản và trầm ấm này, chúng tôi mời bạn gác lại nhịp sống hối hả,
                  để thưởng thức một tách cà phê được pha chế bằng tất cả sự tĩnh tại và tâm huyết.
                </p>
                <Link to="/gioi-thieu" className="btn-outline">
                  Tìm hiểu thêm
                </Link>
              </div>

              {/* Image (Right 60%) */}
              <div className="w-full md:w-[60%]">
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    aspectRatio: '4/3',
                    border: '1px solid var(--color-surface-card)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  }}
                >
                  <img
                    alt="Hạt cà phê rang mộc"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="/images/about/beans.png"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIAL — Stitch layout: centered quote with ambient glow ═══ */}
      <section className="relative overflow-hidden" style={{ padding: '8rem 2rem' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '800px',
            height: '800px',
            background: 'rgba(196,144,61,0.05)',
            filter: 'blur(100px)',
          }}
        />
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-5xl mb-8 block opacity-50" style={{ color: 'var(--color-caramel)' }}>
              ❝
            </div>
            <h3
              className="text-3xl md:text-5xl italic leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
            >
              "Không gian tĩnh lặng tuyệt đối. Tách cà phê Pour Over ở đây thực sự đưa tôi trở về
              với những nốt hương nguyên bản nhất."
            </h3>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              — Nguyễn Minh, Coffee Enthusiast
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══ CTA SECTION — Stitch layout: card with pattern background ═══ */}
      <section className="section-padding px-8" style={{ borderTop: '1px solid rgba(45,36,24,0.5)' }}>
        <Reveal>
          <div
            className="max-w-7xl mx-auto rounded-3xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
            style={{
              background: 'var(--color-surface-card)',
              padding: 'clamp(2rem, 4vw, 4rem)',
              border: '1px solid rgba(45,36,24,0.8)',
            }}
          >
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #C4903D 0, #C4903D 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
              <h2
                className="text-4xl md:text-5xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}
              >
                Ghé thăm không gian của chúng tôi
              </h2>
              <div className="flex flex-col gap-3 font-light" style={{ color: 'rgba(245,236,215,0.8)' }}>
                <p className="flex items-center gap-3">
                  <span style={{ color: 'var(--color-caramel)' }}>📍</span>
                  123 Đường Cà Phê, Quận Trầm, TP.HCM
                </p>
                <p className="flex items-center gap-3">
                  <span style={{ color: 'var(--color-caramel)' }}>🕐</span>
                  Mở cửa: 07:00 - 22:00 mỗi ngày
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-cream)',
                  color: 'var(--color-espresso)',
                }}
              >
                🗺️ Xem bản đồ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
