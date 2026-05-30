import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

export default function About() {
  return (
    <>
      {/* Hero — from Stitch about.html */}
      <section className="relative flex items-center overflow-hidden" style={{ height: '70vh', background: 'var(--color-espresso)' }}>
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Xưởng rang Nâu Coffee"
            className="w-full h-full object-cover opacity-60"
            style={{ mixBlendMode: 'overlay' }}
            src="/images/about/hero.jpg"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #1A1208, rgba(26,18,8,0.8), transparent)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1A1208, transparent, transparent)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
              Câu Chuyện Của Nâu
            </h1>
            <p className="text-xl font-light tracking-wide max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              Hương vị nguyên bản, tâm huyết từng hạt cà phê.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story — 2/5 + 3/5 split */}
      <section className="max-w-7xl mx-auto px-8" style={{ padding: '8rem 2rem' }}>
        <Reveal>
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-2/5 md:pr-12">
              <h2 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-caramel)' }}>
                Khởi Nguồn
              </h2>
              <p className="leading-relaxed text-lg font-light mb-6" style={{ color: 'var(--color-text-muted)' }}>
                Bắt đầu từ niềm đam mê mãnh liệt với hạt cà phê Việt, Nâu hành trình tìm kiếm những hạt Robusta
                và Arabica tinh túy nhất từ các vùng cao nguyên Đà Lạt và Buôn Ma Thuột.
              </p>
              <p className="leading-relaxed text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                Chúng tôi tin rằng, mỗi tách cà phê là một câu chuyện dài từ mảnh đất sương mù đến đôi bàn tay
                nâng niu của người thợ rang.
              </p>
            </div>
            <div className="w-full md:w-3/5 relative">
              <div className="absolute inset-0 rounded-2xl transform translate-x-6 translate-y-6"
                style={{ background: 'rgba(196,144,61,0.1)' }}
              />
              <img
                alt="Hạt cà phê rang"
                className="w-full h-auto rounded-2xl relative z-10 object-cover"
                style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid var(--color-surface-card)' }}
                src="/images/about/origin.jpg"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Values — 01, 02, 03 staggered grid */}
      <section style={{ padding: '8rem 0', background: 'rgba(45,36,24,0.3)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 items-start">
              <div>
                <div className="text-6xl mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(196,144,61,0.3)' }}>01</div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Nguyên Bản</h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Chỉ sử dụng hạt cà phê đặc sản, giữ trọn hương vị gốc. Không tẩm ướp, không pha trộn,
                  để mỗi giọt cà phê kể đúng câu chuyện của vùng đất sinh ra nó.
                </p>
              </div>
              <div className="md:mt-32">
                <div className="text-6xl mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(196,144,61,0.3)' }}>02</div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Tỉ Mỉ</h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Tận tâm trong từng khâu rang xay và pha chế thủ công. Mỗi mẻ rang là một bản giao hưởng
                  của nhiệt độ và thời gian, được kiểm soát bởi sự tinh tế của người nghệ nhân.
                </p>
              </div>
              <div>
                <div className="text-6xl mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(196,144,61,0.3)' }}>03</div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Bền Vững</h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Hỗ trợ nông dân địa phương và quy trình canh tác bền vững. Trân trọng môi trường và những
                  giá trị cộng đồng để ly cà phê không chỉ ngon mà còn mang ý nghĩa nhân văn.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team — 7/5 col asymmetric */}
      <section className="max-w-7xl mx-auto px-8" style={{ padding: '8rem 2rem' }}>
        <Reveal>
          <h2 className="text-4xl mb-16" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-caramel)' }}>Đội Ngũ</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <img
                alt="Trưởng thợ rang"
                className="w-full object-cover rounded-2xl mb-8"
                style={{ height: '600px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid var(--color-surface-card)' }}
                src="/images/about/team.jpg"
                loading="lazy"
              />
              <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Minh Trí</h3>
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--color-caramel)' }}>Trưởng Thợ Rang</p>
              <p className="font-light leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                Với hơn 10 năm đắm mình trong hương cà phê, Trí hiểu rõ ngôn ngữ của từng hạt cà phê
                khi chúng nhảy múa trong lò rang.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-8 justify-end pb-8">
              <div className="p-8 rounded-2xl" style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(45,36,24,0.5)' }}>
                <div className="w-20 h-20 rounded-full mb-6 flex items-center justify-center" style={{ background: 'var(--color-espresso)', border: '1px solid rgba(45,36,24,0.5)' }}>
                  <span className="text-3xl">☕</span>
                </div>
                <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Hà Phương</h3>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-caramel)' }}>Chuyên Gia Pha Chế</p>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Người thổi hồn vào từng ly latte, biến mỗi buổi sáng tại Nâu thành một trải nghiệm nghệ thuật.
                </p>
              </div>
              <div className="p-8 rounded-2xl" style={{ background: 'var(--color-surface-card)', border: '1px solid rgba(45,36,24,0.5)' }}>
                <div className="w-20 h-20 rounded-full mb-6 flex items-center justify-center" style={{ background: 'var(--color-espresso)', border: '1px solid rgba(45,36,24,0.5)' }}>
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>Tuấn Anh</h3>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-caramel)' }}>Thu Mua & Nguồn Gốc</p>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Kết nối trực tiếp với nông dân, đảm bảo những mẻ cà phê xanh chất lượng nhất.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="text-center px-8 relative overflow-hidden" style={{ padding: '10rem 2rem', background: 'var(--color-surface-card)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(196,144,61,0.1), transparent, transparent)' }} />
        <Reveal>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl mb-12" style={{ fontFamily: 'var(--font-heading)', color: '#F5ECD7' }}>
              Hãy ghé Nâu và cảm nhận
            </h2>
            <Link
              to="/khong-gian"
              className="inline-block px-10 py-4 rounded-lg font-semibold tracking-wider uppercase text-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--color-caramel)',
                color: 'var(--color-espresso)',
                boxShadow: '0 0 20px rgba(196,144,61,0.3)',
              }}
            >
              Xem không gian
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
