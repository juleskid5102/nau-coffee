export default function About() {
  return (
    <>
      {/* Hero Section — 45/55 split */}
      <section className="section-padding container-narrow" style={{ paddingTop: '2rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}>
          {/* Left text */}
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '2rem' }}>
            <h1 style={{ color: 'var(--color-ivory)' }}>Câu Chuyện Nâu</h1>
            <p style={{ fontSize: '1.125rem' }}>
              Khởi nguồn từ niềm đam mê mãnh liệt với những hạt cà phê Việt, Nâu là hành trình tìm kiếm và lưu giữ những giá trị nguyên bản nhất. Mỗi mẻ rang tại đây không chỉ là cà phê, mà là một tác phẩm nghệ thuật, là câu chuyện về tâm huyết của những người thợ rang.
            </p>
          </div>

          {/* Right image */}
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
            "Mỗi mẻ rang là một<br />tác phẩm nghệ thuật."
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.8 }}>
            Chúng tôi tin rằng sự hoàn hảo đến từ sự đơn giản và tôn trọng nguyên bản. Phương pháp rang mộc truyền thống kết hợp với nguồn hạt cà phê tuyển chọn gắt gao từ các nông trại bền vững tại Đà Lạt và Buôn Ma Thuột tạo nên một bản giao hưởng hương vị tinh tế, đậm đà bản sắc vùng cao nguyên đất đỏ.
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
            {[
              { icon: 'eco', title: 'Nguyên Liệu', desc: 'Hạt cà phê được tuyển chọn từ các vùng cao nguyên trù phú nhất Việt Nam.' },
              { icon: 'local_fire_department', title: 'Rang Mộc', desc: 'Phương pháp rang thủ công giữ trọn hương vị tự nhiên, không tẩm ướp.' },
              { icon: 'water_drop', title: 'Pha Chế', desc: 'Đa dạng phương thức từ Pour Over, Cold Brew đến Espresso hiện đại.' },
            ].map((v) => (
              <div key={v.title} className="flex items-start" style={{ gap: '1.5rem' }}>
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
                  <p style={{ color: 'var(--color-ash)', fontSize: '1rem' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding container-narrow" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-ivory)', marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>Người Truyền Lửa</h2>
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
                  src="/images/space-detail.jpg"
                  alt="Minh Trí - Founder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>Minh Trí</h3>
              <p className="label-caps" style={{ color: 'var(--color-terracotta)', fontSize: '13px' }}>Head Roaster / Founder</p>
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
                "Cà phê không chỉ là thức uống, nó là sự kết nối giữa người trồng, người rang và người thưởng thức. Chúng tôi chỉ là người kể câu chuyện đó bằng hương vị."
              </p>
            </div>
          </div>
        </div>
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
