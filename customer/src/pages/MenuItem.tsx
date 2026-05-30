import { Link } from 'react-router-dom';

export default function MenuItem() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <Link to="/menu" className="text-sm uppercase tracking-widest mb-8 inline-block" style={{ color: 'var(--color-caramel)' }}>
        ← Quay lại Menu
      </Link>
      <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Chi Tiết Món</h1>
      <p className="font-light" style={{ color: 'var(--color-text-muted)' }}>Trang chi tiết sẽ được cập nhật sau.</p>
    </div>
  );
}
