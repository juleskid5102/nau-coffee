import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* HERO SECTION — 45/55 asymmetric split */}
      <header ref={heroRef} className="section-padding container-narrow" style={{ paddingTop: '2rem' }}>
        <div
          className="grid grid-cols-1 md:grid-cols-12 items-center"
          style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
        >
          {/* Left Content (5 cols = ~42%) */}
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '2rem' }}>
            <h1 className="reveal-item" style={{ color: 'var(--color-ivory)' }}>
              Khoảnh khắc<br />của sự<br />tinh tế.
            </h1>
            <p className="reveal-item" style={{ fontSize: '1.125rem', maxWidth: '28rem' }}>
              Cà phê nguyên bản, rang mộc mỗi ngày. Nơi mỗi giọt cà phê kể câu chuyện riêng.
            </p>
            <Link to="/menu" className="btn-primary reveal-item" style={{ textDecoration: 'none' }}>
              Khám Phá
            </Link>
          </div>

          {/* Right Image (7 cols = ~58%) */}
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
                  src="https://lh3.googleusercontent.com/aida/ADBb0ui88_so5oDLwFdH6vjfQqWQN-MTmbqCZ_Zb6sTNuYAXzi9MidNTA6qwcZ5VvBtjbzhIdHcl-LYWxqj0vGUh6XLpGvhwDEDGDb__Y-9QCuFvxSjfsv90fq8aGk2SElfMcYDkJjxV-FIqGQVQ3AWs2VLhfBoyCO2M65_mXuX0nlXu4d8yJGhURKQg6KSCm5SGuvD_8_k_WXwi3_jVIbLyvGj8dPvrClKDLXHh3BwfF7gwtsDbIn_Et6Oh2CE"
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
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhYTBNHld8K7OrmNHYSoCm6rMvuwSo8wkogKJZhsRvfwto8n1Pj8tzMdCbeEh5_Y1HClbTDKr4ILgpwVLKxDT0xUi6G-efsfzwHm3hSdcvc7_2OmRSw7KzIojKQSZ6RPiRAD97_DTXVeRRcWVxYb2mmN3eka6vaj-WqiEeKbcvnEnilB3Y6YOQukF68zJVnJf2ZQL-fTNE_85mzYUkjjjp4PoJh4YguElRAmNFrgHILDSBSwx2V_9eiPlU"
                  alt="Cà Phê Muối"
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
                      <h3 style={{ fontSize: '32px', marginBottom: '0.5rem' }}>Cà Phê Muối</h3>
                      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem' }}>
                        Sự kết hợp hoàn hảo giữa vị đắng, ngọt và chút mặn mà đặc trưng.
                      </p>
                    </div>
                    <span className="mono-data" style={{ color: 'var(--color-terracotta)', fontSize: '18px' }}>55k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right stacked — 5 cols */}
          <div className="md:col-span-5 flex flex-col" style={{ gap: '2rem' }}>
            {[
              {
                name: 'Bạc Xỉu',
                price: '45k',
                img: 'https://lh3.googleusercontent.com/aida/ADBb0uj9W500ejUaqI85xY3VUiHNli_fkyM24xs43YD2WsshHGdgtYfh4lEfthwAcDW8d7Ss-myO92CDRKqwDtiGd-JyDicc_6j6K_1M57wwQcE_liax4V7YpK2ljmGF8dv88gsu5o69edJxN8oT3qJCVPq-a3mSqpOxylnjlLxyHWFa65MX56L--6qJAIrVHhc-IZeDOcLZx06mWvsSSvaGdzzlxBmEx8ssYVoCxQfI5WA6qAEA1KPs1MHE49E',
              },
              {
                name: 'Cold Brew',
                price: '60k',
                img: 'https://lh3.googleusercontent.com/aida/ADBb0ui_dT8xYvlAnCZKgB6ZfsasHMiDVvSuzzsWxP0PNUc5QexYzA7U55VuA0W8XHRdWZy7C13KA2MbIg7ryMhpdXlOy-7bA1Bdi75Sb_T8YmFVxHq8T8YkjozU7mrOYBRqzU9vIZztEyhAwo17iEaTNJ0ebAVCu5AgU3Z0KRP61aEmgllEg9jMOn34eUFuiPhKFGU08iP27Klf4vpCPF4CSPHDHJd3hCBSqoXdBLg3WSSJtdhbJSWPjOlGu2I',
              },
            ].map((item) => (
              <div key={item.name} className="reveal-item" style={{ flex: 1 }}>
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
                      src={item.img}
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
                      <span className="mono-data" style={{ color: 'var(--color-terracotta)' }}>{item.price}</span>
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
            <h2 className="reveal-item">Câu Chuyện Nâu</h2>
            <p className="reveal-item" style={{ fontSize: '1rem' }}>
              Bắt nguồn từ tình yêu với hạt cà phê nguyên bản, Nâu là một hành trình tìm về những giá trị cốt lõi. Chúng tôi không chỉ rang xay cà phê, chúng tôi gìn giữ hương vị của thời gian và sự tỉ mỉ trong từng công đoạn.
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
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujj8coCWp_TX1_gqvclGa6UKcNEzNScVAGC2On75vlVOxMS-v5_-ZjAdQsSidRHEFxZ2b33762mm-krAESh13aVrJFe-RsCIdxLHddcd-a1X4lH4pUm5cfZG1WKvue_93tgmEiDnFNMYqbp9BCn236zFlhVPIErpQ3_vg8xaJhIDGEBzkM_KawpvXR6fQlCpGFI14eSZWalPqGDMaqb8gNyKKTAfUpQRTVrtfh26pSehS63aNjEI9iLFA"
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
      <section
        ref={quoteRef}
        className="section-padding flex justify-center items-center"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(4rem, 10vw, 8rem) var(--spacing-gutter)',
        }}
      >
        {/* Ambient glow */}
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
          {/* Large typographic quote mark */}
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
            Không gian tĩnh lặng tuyệt đối. Tách cà phê Pour Over ở đây thực sự đưa tôi trở về với những nốt hương nguyên bản nhất.
          </p>
          <div className="label-caps reveal-item" style={{ color: 'var(--color-terracotta)' }}>
            Nguyễn Minh <span style={{ color: 'var(--color-ash)', margin: '0 0.5rem' }}>|</span> Coffee Enthusiast
          </div>
        </div>
      </section>

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
            {/* Terracotta tint */}
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
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>123 Đường Sách, Quận 1, TP. HCM</span>
                  </div>
                  <div className="flex items-center" style={{ gap: '1rem' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-terracotta)' }}>schedule</span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>07:00 - 22:00 Mỗi ngày</span>
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
