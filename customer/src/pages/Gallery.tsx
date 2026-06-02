import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { GalleryImage, SiteSettings } from '../lib/api';
import { SkeletonGallery } from '../components/Skeleton';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getGallery(),
      api.getSiteSettings(),
    ]).then(([imgs, s]) => {
      setImages(imgs);
      setSettings(s);
      setLoading(false);
    }).catch(err => {
      console.error('Gallery: Failed to load data', err);
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <SkeletonGallery count={8} />
        ) : (
          <div className="masonry-grid">
            {images.map((img) => (
              <div key={img.id} className="masonry-item">
                <div className="double-bezel spring-hover" style={{ borderRadius: '1.5rem' }}>
                  <div
                    className="double-bezel-inner"
                    style={{
                      borderRadius: 'calc(1.5rem - 6px)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={img.image}
                      alt={img.alt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: img.is_tall ? '400px' : '280px',
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
        )}
      </section>

      {/* Space Details — 45/55 split */}
      <section className="section-padding container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: '4rem' }}>
          <div className="md:col-span-5 flex flex-col items-start" style={{ gap: '1.5rem' }}>
            <h2 style={{ color: 'var(--color-ivory)' }}>{settings?.space_title || 'Thiết Kế'}</h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-ash)', lineHeight: 1.8 }}>
              {settings?.space_text_1 || ''}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--color-ash)', lineHeight: 1.8 }}>
              {settings?.space_text_2 || ''}
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
