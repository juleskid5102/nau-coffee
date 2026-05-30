import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-32 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Đặt Hàng Thành Công!</h1>
      <p className="font-light text-lg mb-10" style={{ color: 'var(--color-text-muted)' }}>
        Cảm ơn bạn đã đặt món tại Nâu Coffee. Chúng tôi sẽ chuẩn bị đơn hàng cho bạn ngay.
      </p>
      <Link
        to="/"
        className="btn-primary text-lg px-8 py-4"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}
