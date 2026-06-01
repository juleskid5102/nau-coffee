import { useState } from 'react';

const categories = ['Tất Cả', 'Cà Phê', 'Trà', 'Đá Xay', 'Bánh Ngọt'];

const menuItems = [
  {
    name: 'Cà Phê Muối',
    price: '65.000đ',
    description: 'Sự kết hợp hoàn hảo giữa vị đắng của cà phê nguyên chất, vị béo của kem và chút mặn mòi tinh tế của muối hồng Himalaya.',
    category: 'Cà Phê',
    wide: true,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0uhYTBNHld8K7OrmNHYSoCm6rMvuwSo8wkogKJZhsRvfwto8n1Pj8tzMdCbeEh5_Y1HClbTDKr4ILgpwVLKxDT0xUi6G-efsfzwHm3hSdcvc7_2OmRSw7KzIojKQSZ6RPiRAD97_DTXVeRRcWVxYb2mmN3eka6vaj-WqiEeKbcvnEnilB3Y6YOQukF68zJVnJf2ZQL-fTNE_85mzYUkjjjp4PoJh4YguElRAmNFrgHILDSBSwx2V_9eiPlU',
  },
  {
    name: 'Bạc Xỉu',
    price: '45.000đ',
    description: 'Hương vị truyền thống với lớp sữa đặc ngọt ngào hòa quyện cùng espresso đậm vị.',
    category: 'Cà Phê',
    wide: false,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0uj9W500ejUaqI85xY3VUiHNli_fkyM24xs43YD2WsshHGdgtYfh4lEfthwAcDW8d7Ss-myO92CDRKqwDtiGd-JyDicc_6j6K_1M57wwQcE_liax4V7YpK2ljmGF8dv88gsu5o69edJxN8oT3qJCVPq-a3mSqpOxylnjlLxyHWFa65MX56L--6qJAIrVHhc-IZeDOcLZx06mWvsSSvaGdzzlxBmEx8ssYVoCxQfI5WA6qAEA1KPs1MHE49E',
  },
  {
    name: 'Cold Brew',
    price: '55.000đ',
    description: 'Cà phê ủ lạnh 24h, mượt mà, ít chua, thoang thoảng hương trái cây nhiệt đới.',
    category: 'Cà Phê',
    wide: false,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0ui_dT8xYvlAnCZKgB6ZfsasHMiDVvSuzzsWxP0PNUc5QexYzA7U55VuA0W8XHRdWZy7C13KA2MbIg7ryMhpdXlOy-7bA1Bdi75Sb_T8YmFVxHq8T8YkjozU7mrOYBRqzU9vIZztEyhAwo17iEaTNJ0ebAVCu5AgU3Z0KRP61aEmgllEg9jMOn34eUFuiPhKFGU08iP27Klf4vpCPF4CSPHDHJd3hCBSqoXdBLg3WSSJtdhbJSWPjOlGu2I',
  },
  {
    name: 'Cà Phê Trứng',
    price: '60.000đ',
    description: 'Đặc sản Hà Nội giữa lòng phố. Lớp kem trứng đánh bông mềm mịn, thơm lừng ôm trọn vị đắng gắt của robusta rang mộc.',
    category: 'Cà Phê',
    wide: true,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0uhgREk2lHObA1EODb-VEOHtLOwyQymVH17DoE33ocXQupp5J2ifFdzmAqKbT6QPhnU-6R9aTephVcNY5MT9i48-JnEuj71ENUiUgjcDLsxlj77yDsS7uFeHlVWGK71EzTzB8L9WvvYrkr4c_weE8k_TIZPhgG_TWH4FsQ2jgwmresT1tu9QV8YqO1-8TXSe8Kew7wXbiJpBUYAvv0JkOPuLXnsKS_X00qbpe_5rB0VXr3Pnaznqm0980Mk',
  },
  {
    name: 'Trà Sen',
    price: '50.000đ',
    description: 'Trà mạn ướp hương sen thanh tao, dịu nhẹ, mang lại cảm giác thư thái.',
    category: 'Trà',
    wide: false,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0ujDRJbXlQ3Lw-BqfZP9uwnRHD_Jap3nSXpZBqBan_MlyzyJkBKBuhEQSsaC3sf8H8IJUqr-Fx2tDlk60PPzAHFcBpsfqaT9vviz5nU5oWTrSgjQDMpavi-CqlLzosv585S_Iu_8q-jwthdsHG7tZHdjg9OJFIpEltaIO9sd7bHKIY4j1PP0Kvg3fYcIyTLuVMiqfQ5yJy9viQEgWWz2kCe5fLdd-DTZGslWuGVgIJxvV0sjy95cm02SJw',
  },
  {
    name: 'Matcha Latte',
    price: '65.000đ',
    description: 'Bột matcha thượng hạng từ Nhật Bản kết hợp cùng sữa tươi béo ngậy.',
    category: 'Trà',
    wide: false,
    img: 'https://lh3.googleusercontent.com/aida/ADBb0uhHXNP3d_4Tw1WnKUpc8riY1djntKaiHxY4s4DsdBvL68eI_lDVaYV3DPq4C2v1UoogiUZ14al-RSTb3yQebgGUfO-ZNfSQ5JGR0T2T1URVLxx5UzFKNtsJ8rSbnTGi-O3He9fR9NWp0Xi-e3zswRYh3tqR6Eq5MWSdOP7x_brQ-iDYrsJkbkERnvTeB1ilLANMG9oTt-5XU4J9bKTUx8HHqGme3i7MRCnR_AUhA67nEXM9mSV5N2nrLMA',
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả');

  const filtered = activeCategory === 'Tất Cả'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <header className="container-narrow" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-ivory)', marginBottom: '1.5rem' }}>Thực Đơn</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-ash)' }}>
          Mỗi ly cà phê là một tác phẩm được chế tác tỉ mỉ.
        </p>
      </header>

      {/* Sticky Category Bar */}
      <div
        className="no-scrollbar"
        style={{
          position: 'sticky',
          top: 80,
          zIndex: 40,
          background: 'rgba(20, 17, 14, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-surface-variant)',
          padding: '1rem var(--spacing-gutter)',
          marginBottom: '4rem',
        }}
      >
        <div
          className="container-narrow flex items-center no-scrollbar"
          style={{ gap: '0.75rem', overflowX: 'auto', padding: 0 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container-narrow" style={{ paddingBottom: 'var(--spacing-section)' }}>
        <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: '1.5rem' }}>
          {filtered.map((item) => (
            <article
              key={item.name}
              className={item.wide ? 'col-span-1 md:col-span-8' : 'col-span-1 md:col-span-4'}
            >
              <div className="double-bezel spring-hover" style={{ borderRadius: '1rem', height: '100%' }}>
                <div
                  className="double-bezel-inner"
                  style={{
                    borderRadius: 'calc(1rem - 6px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: item.wide ? 'row' : 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: item.wide ? '50%' : '100%',
                      aspectRatio: item.wide ? 'auto' : '4/3',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      width: item.wide ? '50%' : '100%',
                      padding: item.wide ? '2rem' : '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      background: 'var(--color-charcoal)',
                    }}
                  >
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: item.wide ? '32px' : '24px' }}>{item.name}</h3>
                      <span className="mono-data" style={{ color: 'var(--color-terracotta)' }}>{item.price}</span>
                    </div>
                    <p className="line-clamp-2" style={{ color: 'var(--color-ash)', fontSize: '1rem', marginBottom: item.wide ? '2rem' : '1.5rem' }}>
                      {item.description}
                    </p>
                    {!item.wide && (
                      <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                        Thêm vào giỏ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
