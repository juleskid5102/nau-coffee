const galleryImages = [
  {
    src: '/images/barista-pourover.jpg',
    alt: 'Barista pha chế pour-over',
    tall: true,
  },
  {
    src: '/images/coffee-roasting.jpg',
    alt: 'Hạt cà phê đang rang',
    tall: false,
  },
  {
    src: '/images/ca-phe-muoi.jpg',
    alt: 'Cà phê muối đặc sản',
    tall: false,
  },
  {
    src: '/images/bac-xiu.jpg',
    alt: 'Bạc Xỉu truyền thống',
    tall: true,
  },
  {
    src: '/images/cold-brew.jpg',
    alt: 'Cold Brew trong không gian',
    tall: false,
  },
  {
    src: '/images/tra-sen.jpg',
    alt: 'Trà sen thanh tao',
    tall: false,
  },
  {
    src: '/images/ca-phe-trung.jpg',
    alt: 'Cà phê trứng Hà Nội',
    tall: true,
  },
  {
    src: '/images/matcha-latte.jpg',
    alt: 'Matcha Latte nghệ thuật',
    tall: false,
  },
];

export default function Gallery() {
  return (
    <>
      {/* Page Header */}
      <header className="container-narrow" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>Không Gian Nâu</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)' }}>
          Nơi tìm thấy sự tĩnh lặng giữa nhịp sống hối hả.
        </p>
      </header>

      {/* Masonry Gallery */}
      <section className="container-narrow section-padding" style={{ paddingTop: 0 }}>
        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <div key={i} className="masonry-item">
              <div className="double-bezel spring-hover" style={{ borderRadius: '1.5rem' }}>
                <div
                  className="double-bezel-inner"
                  style={{
                    borderRadius: 'calc(1.5rem - 6px)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: img.tall ? '400px' : '280px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1)';
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Space Details — 45/55 split */}
      <section className="section-padding container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: '4rem' }}>
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '1.5rem' }}>
            <h2 style={{ color: 'var(--color-ivory)' }}>Thiết Kế</h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-ash)', lineHeight: 1.8 }}>
              Không gian Nâu được thiết kế theo triết lý tối giản — nơi ánh sáng tự nhiên hòa cùng gỗ tối và đá nguyên bản. Mỗi góc ngồi đều là một nơi ẩn náu riêng tư, mời gọi bạn chậm lại và thưởng thức khoảnh khắc.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--color-ash)', lineHeight: 1.8 }}>
              Chúng tôi tin rằng không gian tác động sâu sắc đến trải nghiệm thưởng thức cà phê. Vì thế, mọi chi tiết — từ loại gỗ, ánh đèn đến âm nhạc — đều được chọn lựa cẩn thận.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="double-bezel" style={{ borderRadius: '2rem' }}>
              <div
                className="double-bezel-inner"
                style={{
                  borderRadius: 'calc(2rem - 6px)',
                  height: 'clamp(300px, 50vh, 60vh)',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/space-detail.jpg"
                  alt="Chi tiết kiến trúc không gian"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
