// Skeleton loading components matching the dark theme
// Uses CSS shimmer animation defined in index.css

export function SkeletonBlock({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        background: 'linear-gradient(90deg, rgba(45,36,24,0.6) 25%, rgba(60,48,32,0.8) 50%, rgba(45,36,24,0.6) 75%)',
        backgroundSize: '200% 100%',
        borderRadius: '12px',
        ...style,
      }}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          style={{
            height: '14px',
            width: i === lines - 1 ? '60%' : '100%',
            borderRadius: '6px',
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--color-surface-card)',
        border: '1px solid rgba(45,36,24,0.5)',
        borderRadius: '16px',
        padding: '1rem',
        display: 'flex',
        gap: '1.25rem',
        alignItems: 'center',
      }}
    >
      <SkeletonBlock style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '12px' }} />
      <div style={{ flex: 1 }}>
        <SkeletonBlock style={{ height: '18px', width: '60%', marginBottom: '8px', borderRadius: '6px' }} />
        <SkeletonBlock style={{ height: '14px', width: '80%', marginBottom: '6px', borderRadius: '6px' }} />
        <SkeletonBlock style={{ height: '16px', width: '30%', borderRadius: '6px' }} />
      </div>
    </div>
  );
}

export function SkeletonMenuGrid({ count = 6 }: { count?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-card)',
            border: '1px solid rgba(45,36,24,0.5)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <SkeletonBlock style={{ width: '100%', height: '220px', borderRadius: 0 }} />
          <div style={{ padding: '1.5rem' }}>
            <SkeletonBlock style={{ height: '20px', width: '50%', marginBottom: '10px', borderRadius: '6px' }} />
            <SkeletonText lines={2} />
            <SkeletonBlock style={{ height: '18px', width: '25%', marginTop: '12px', borderRadius: '6px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonGallery({ count = 8 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem',
      gridAutoRows: '250px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock
          key={i}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            gridRow: i % 3 === 0 ? 'span 2' : 'span 1',
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div style={{ padding: '8rem 0 4rem', maxWidth: '800px' }}>
      <SkeletonBlock style={{ height: '60px', width: '70%', marginBottom: '1.5rem' }} />
      <SkeletonBlock style={{ height: '24px', width: '90%', marginBottom: '0.75rem' }} />
      <SkeletonBlock style={{ height: '24px', width: '60%', marginBottom: '2rem' }} />
      <SkeletonBlock style={{ height: '52px', width: '180px', borderRadius: '999px' }} />
    </div>
  );
}
