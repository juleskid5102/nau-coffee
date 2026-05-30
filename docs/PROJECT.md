# ☕ Nâu Coffee — Project Overview

## Thông tin dự án
- **Tên**: Nâu Coffee  
- **Tagline**: "Cà phê chất lượng, kết nối cảm xúc"
- **Mô tả**: Website quán cà phê specialty — giới thiệu thương hiệu, menu, không gian, và hỗ trợ đặt món online
- **Ngôn ngữ**: Tiếng Việt
- **Loại**: Single-page application (SPA) — responsive desktop + mobile

## Brand Identity
> Nguồn: `docs/a1e35c71-9786-4072-9277-1267c7f3d64b.png`

### Logo
- Chữ "Nâu" viết script kết hợp icon hạt cà phê + lá cây
- Có 4 biến thể: Horizontal Lockup, Stacked Lockup, Monochrome Dark, Monochrome Light
- Icon mark riêng: hạt cà phê + lá trong vòng tròn (có phiên bản cho social avatar)
- Clear space: khoảng cách X xung quanh logo

### Typography (theo Brand Kit)
| Vai trò | Font | Weight |
|---------|------|--------|
| Display / Heading | **DM Serif Display** | Regular |
| Body / UI | **Outfit** | Regular, Medium |

### Color Palette (theo Brand Kit)
| Tên | Hex | Vai trò |
|-----|-----|---------|
| Espresso Dark | `#1A1208` | Background chính, text trên nền sáng |
| Coffee Brown | `#2D2418` | Surface cards, background phụ |
| Warm Gray | `#8A7E6E` | Text muted, borders, secondary |
| Caramel Gold | `#C4903D` | Accent chính — CTAs, highlights, logo |
| Cream | `#F5ECD7` | Text trên nền tối, background sáng |

### Logo Usage Rules
- Không distort
- Không đổi màu
- Không thêm effects
- Không xoay

## Mission Statement
> Nâu Coffee mang đến những trải nghiệm cà phê nguyên bản và tinh tế, tôn vinh giá trị thật trong từng khoảnh khắc.

## Website Concept (từ Brand Kit mockup)
- Hero: "Khoảnh khắc của sự tinh tế" + CTA "Khám Phá"
- Navigation: Về Nâu | Sản Phẩm | Cửa Hàng | Kiến Thức | Liên Hệ
- Dark mode chủ đạo — espresso background
- Packaging: túi cà phê Signature

## Target Audience
- Người yêu cà phê specialty, 25-45 tuổi
- Quan tâm đến chất lượng, nguồn gốc, trải nghiệm
- Urban, có gu thẩm mỹ

## Tính năng chính
1. **Trang chủ** — Hero, giới thiệu, menu nổi bật, câu chuyện, CTA
2. **Menu** — Danh sách sản phẩm theo danh mục, chi tiết món
3. **Giới thiệu** — Câu chuyện thương hiệu, giá trị, đội ngũ
4. **Không gian** — Gallery ảnh quán
5. **Liên hệ** — Form liên hệ, bản đồ, thông tin
6. **Đặt món** — Form đặt hàng online + theo dõi đơn

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | Vite + React + TypeScript + Tailwind v4 |
| Animation | GSAP + Lenis smooth scroll |
| Backend | Hono + Cloudflare Workers |
| Database | Firestore |
| Hosting | Cloudflare Pages |
