const galleryImages = [
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0ui88_so5oDLwFdH6vjfQqWQN-MTmbqCZ_Zb6sTNuYAXzi9MidNTA6qwcZ5VvBtjbzhIdHcl-LYWxqj0vGUh6XLpGvhwDEDGDb__Y-9QCuFvxSjfsv90fq8aGk2SElfMcYDkJjxV-FIqGQVQ3AWs2VLhfBoyCO2M65_mXuX0nlXu4d8yJGhURKQg6KSCm5SGuvD_8_k_WXwi3_jVIbLyvGj8dPvrClKDLXHh3BwfF7gwtsDbIn_Et6Oh2CE',
    alt: 'Barista pha chế pour-over',
    tall: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0ujj8coCWp_TX1_gqvclGa6UKcNEzNScVAGC2On75vlVOxMS-v5_-ZjAdQsSidRHEFxZ2b33762mm-krAESh13aVrJFe-RsCIdxLHddcd-a1X4lH4pUm5cfZG1WKvue_93tgmEiDnFNMYqbp9BCn236zFlhVPIErpQ3_vg8xaJhIDGEBzkM_KawpvXR6fQlCpGFI14eSZWalPqGDMaqb8gNyKKTAfUpQRTVrtfh26pSehS63aNjEI9iLFA',
    alt: 'Hạt cà phê đang rang',
    tall: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0uhYTBNHld8K7OrmNHYSoCm6rMvuwSo8wkogKJZhsRvfwto8n1Pj8tzMdCbeEh5_Y1HClbTDKr4ILgpwVLKxDT0xUi6G-efsfzwHm3hSdcvc7_2OmRSw7KzIojKQSZ6RPiRAD97_DTXVeRRcWVxYb2mmN3eka6vaj-WqiEeKbcvnEnilB3Y6YOQukF68zJVnJf2ZQL-fTNE_85mzYUkjjjp4PoJh4YguElRAmNFrgHILDSBSwx2V_9eiPlU',
    alt: 'Cà phê muối đặc sản',
    tall: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0uj9W500ejUaqI85xY3VUiHNli_fkyM24xs43YD2WsshHGdgtYfh4lEfthwAcDW8d7Ss-myO92CDRKqwDtiGd-JyDicc_6j6K_1M57wwQcE_liax4V7YpK2ljmGF8dv88gsu5o69edJxN8oT3qJCVPq-a3mSqpOxylnjlLxyHWFa65MX56L--6qJAIrVHhc-IZeDOcLZx06mWvsSSvaGdzzlxBmEx8ssYVoCxQfI5WA6qAEA1KPs1MHE49E',
    alt: 'Bạc Xỉu truyền thống',
    tall: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0ui_dT8xYvlAnCZKgB6ZfsasHMiDVvSuzzsWxP0PNUc5QexYzA7U55VuA0W8XHRdWZy7C13KA2MbIg7ryMhpdXlOy-7bA1Bdi75Sb_T8YmFVxHq8T8YkjozU7mrOYBRqzU9vIZztEyhAwo17iEaTNJ0ebAVCu5AgU3Z0KRP61aEmgllEg9jMOn34eUFuiPhKFGU08iP27Klf4vpCPF4CSPHDHJd3hCBSqoXdBLg3WSSJtdhbJSWPjOlGu2I',
    alt: 'Cold Brew trong không gian',
    tall: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0ujDRJbXlQ3Lw-BqfZP9uwnRHD_Jap3nSXpZBqBan_MlyzyJkBKBuhEQSsaC3sf8H8IJUqr-Fx2tDlk60PPzAHFcBpsfqaT9vviz5nU5oWTrSgjQDMpavi-CqlLzosv585S_Iu_8q-jwthdsHG7tZHdjg9OJFIpEltaIO9sd7bHKIY4j1PP0Kvg3fYcIyTLuVMiqfQ5yJy9viQEgWWz2kCe5fLdd-DTZGslWuGVgIJxvV0sjy95cm02SJw',
    alt: 'Trà sen thanh tao',
    tall: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0uhgREk2lHObA1EODb-VEOHtLOwyQymVH17DoE33ocXQupp5J2ifFdzmAqKbT6QPhnU-6R9aTephVcNY5MT9i48-JnEuj71ENUiUgjcDLsxlj77yDsS7uFeHlVWGK71EzTzB8L9WvvYrkr4c_weE8k_TIZPhgG_TWH4FsQ2jgwmresT1tu9QV8YqO1-8TXSe8Kew7wXbiJpBUYAvv0JkOPuLXnsKS_X00qbpe_5rB0VXr3Pnaznqm0980Mk',
    alt: 'Cà phê trứng Hà Nội',
    tall: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida/ADBb0uhHXNP3d_4Tw1WnKUpc8riY1djntKaiHxY4s4DsdBvL68eI_lDVaYV3DPq4C2v1UoogiUZ14al-RSTb3yQebgGUfO-ZNfSQ5JGR0T2T1URVLxx5UzFKNtsJ8rSbnTGi-O3He9fR9NWp0Xi-e3zswRYh3tqR6Eq5MWSdOP7x_brQ-iDYrsJkbkERnvTeB1ilLANMG9oTt-5XU4J9bKTUx8HHqGme3i7MRCnR_AUhA67nEXM9mSV5N2nrLMA',
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
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhd_ME5sNjEZK6Tnn54hdA0fzQxMyJ3vlORsk2y1b7-talYt_xPI-Il6OafLRtDM_bru5N8RcE521vndPBiTQlEwJW914sMj0SPTSCKdcmgZ1l8iz2AWUw12XmaMOHErfpJS7bkAmauaH_FS5Kc4zcK3rNMxD3mt0badKHgMDxlJnttc92gT3vSh3E10ycNDpn1HkDWEvu7mg8ENsgHfTquRPpub7G30X4yx_6f1orHDgWhGjUnucGnspo"
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
