// @ts-nocheck
// Seed script — run once to populate Firestore with initial data
// Usage: cd worker && npx wrangler dev (in one terminal)
//        Then run: curl http://localhost:8787/api/admin/seed

import { Hono } from 'hono';
import type { AppContext } from '../index';

export const seedRoutes = new Hono<AppContext>();

// ─── SEED DATA ────────────────────────────────────────

const siteSettings = {
  hero_title: 'Khoảnh khắc của sự tinh tế.',
  hero_subtitle: 'Cà phê nguyên bản, rang mộc mỗi ngày. Nơi mỗi giọt cà phê kể câu chuyện riêng.',
  hero_cta: 'Khám Phá',
  address: '123 Đường Cà Phê, Quận Trầm, TP.HCM',
  phone: '0901 234 567',
  email: 'hello@naucoffee.vn',
  hours: '07:00 - 22:00 mỗi ngày',
  social_instagram: 'https://instagram.com/naucoffee',
  social_facebook: 'https://facebook.com/naucoffee',
  philosophy_quote: 'Mỗi mẻ rang là một tác phẩm nghệ thuật.',
  philosophy_text: 'Chúng tôi tin rằng sự hoàn hảo đến từ sự đơn giản và tôn trọng nguyên bản. Phương pháp rang mộc truyền thống kết hợp với nguồn hạt cà phê tuyển chọn gắt gao từ các nông trại bền vững tại Đà Lạt và Buôn Ma Thuột tạo nên một bản giao hưởng hương vị tinh tế, đậm đà bản sắc vùng cao nguyên đất đỏ.',
  story_title: 'Câu Chuyện Nâu',
  story_text: 'Bắt nguồn từ tình yêu với hạt cà phê nguyên bản, Nâu là một hành trình tìm về những giá trị cốt lõi. Chúng tôi không chỉ rang xay cà phê, chúng tôi gìn giữ hương vị của thời gian và sự tỉ mỉ trong từng công đoạn.',
  space_title: 'Thiết Kế',
  space_text_1: 'Không gian Nâu được thiết kế theo triết lý tối giản — nơi ánh sáng tự nhiên hòa cùng gỗ tối và đá nguyên bản. Mỗi góc ngồi đều là một nơi ẩn náu riêng tư, mời gọi bạn chậm lại và thưởng thức khoảnh khắc.',
  space_text_2: 'Chúng tôi tin rằng không gian tác động sâu sắc đến trải nghiệm thưởng thức cà phê. Vì thế, mọi chi tiết — từ loại gỗ, ánh đèn đến âm nhạc — đều được chọn lựa cẩn thận.',
};

const categories = [
  { id: 'ca-phe', name: 'Cà Phê', slug: 'ca-phe', order: 1 },
  { id: 'tra', name: 'Trà', slug: 'tra', order: 2 },
  { id: 'da-xay', name: 'Đá Xay', slug: 'da-xay', order: 3 },
  { id: 'banh-ngot', name: 'Bánh Ngọt', slug: 'banh-ngot', order: 4 },
];

const menuItems = [
  {
    name: 'Cà Phê Muối', slug: 'ca-phe-muoi', price: 65000,
    description: 'Sự kết hợp hoàn hảo giữa vị đắng của cà phê nguyên chất, vị béo của kem và chút mặn mòi tinh tế của muối hồng Himalaya.',
    category_id: 'ca-phe', image: '/images/ca-phe-muoi.jpg', featured: true, wide: true, order: 1, is_active: true,
  },
  {
    name: 'Bạc Xỉu', slug: 'bac-xiu', price: 45000,
    description: 'Hương vị truyền thống với lớp sữa đặc ngọt ngào hòa quyện cùng espresso đậm vị.',
    category_id: 'ca-phe', image: '/images/bac-xiu.jpg', featured: true, wide: false, order: 2, is_active: true,
  },
  {
    name: 'Cold Brew', slug: 'cold-brew', price: 55000,
    description: 'Cà phê ủ lạnh 24h, mượt mà, ít chua, thoang thoảng hương trái cây nhiệt đới.',
    category_id: 'ca-phe', image: '/images/cold-brew.jpg', featured: true, wide: false, order: 3, is_active: true,
  },
  {
    name: 'Cà Phê Trứng', slug: 'ca-phe-trung', price: 60000,
    description: 'Đặc sản Hà Nội giữa lòng phố. Lớp kem trứng đánh bông mềm mịn, thơm lừng ôm trọn vị đắng gắt của robusta rang mộc.',
    category_id: 'ca-phe', image: '/images/ca-phe-trung.jpg', featured: false, wide: true, order: 4, is_active: true,
  },
  {
    name: 'Trà Sen', slug: 'tra-sen', price: 50000,
    description: 'Trà mạn ướp hương sen thanh tao, dịu nhẹ, mang lại cảm giác thư thái.',
    category_id: 'tra', image: '/images/tra-sen.jpg', featured: false, wide: false, order: 5, is_active: true,
  },
  {
    name: 'Matcha Latte', slug: 'matcha-latte', price: 65000,
    description: 'Bột matcha thượng hạng từ Nhật Bản kết hợp cùng sữa tươi béo ngậy.',
    category_id: 'tra', image: '/images/matcha-latte.jpg', featured: false, wide: false, order: 6, is_active: true,
  },
  {
    name: 'Bánh Croissant', slug: 'banh-croissant', price: 35000,
    description: 'Bánh croissant nướng giòn rụm, bơ thơm phức, kết hợp hoàn hảo cùng một ly cà phê.',
    category_id: 'banh-ngot', image: '/images/barista-pourover.jpg', featured: false, wide: false, order: 7, is_active: true,
  },
];

const gallery = [
  { image: '/images/barista-pourover.jpg', alt: 'Barista pha chế pour-over', is_tall: true, order: 1, is_active: true },
  { image: '/images/coffee-roasting.jpg', alt: 'Hạt cà phê đang rang', is_tall: false, order: 2, is_active: true },
  { image: '/images/ca-phe-muoi.jpg', alt: 'Cà phê muối đặc sản', is_tall: false, order: 3, is_active: true },
  { image: '/images/bac-xiu.jpg', alt: 'Bạc Xỉu truyền thống', is_tall: true, order: 4, is_active: true },
  { image: '/images/cold-brew.jpg', alt: 'Cold Brew trong không gian', is_tall: false, order: 5, is_active: true },
  { image: '/images/tra-sen.jpg', alt: 'Trà sen thanh tao', is_tall: false, order: 6, is_active: true },
  { image: '/images/ca-phe-trung.jpg', alt: 'Cà phê trứng Hà Nội', is_tall: true, order: 7, is_active: true },
  { image: '/images/matcha-latte.jpg', alt: 'Matcha Latte nghệ thuật', is_tall: false, order: 8, is_active: true },
];

const team = [
  {
    name: 'Minh Trí', role: 'Head Roaster / Founder',
    image: '/images/space-detail.jpg',
    quote: 'Cà phê không chỉ là thức uống, nó là sự kết nối giữa người trồng, người rang và người thưởng thức. Chúng tôi chỉ là người kể câu chuyện đó bằng hương vị.',
    order: 1,
  },
];

const brandValues = [
  { icon: 'eco', title: 'Nguyên Liệu', description: 'Hạt cà phê được tuyển chọn từ các vùng cao nguyên trù phú nhất Việt Nam.', order: 1 },
  { icon: 'local_fire_department', title: 'Rang Mộc', description: 'Phương pháp rang thủ công giữ trọn hương vị tự nhiên, không tẩm ướp.', order: 2 },
  { icon: 'water_drop', title: 'Pha Chế', description: 'Đa dạng phương thức từ Pour Over, Cold Brew đến Espresso hiện đại.', order: 3 },
];

const testimonials = [
  {
    name: 'Nguyễn Minh', title: 'Coffee Enthusiast',
    content: 'Không gian tĩnh lặng tuyệt đối. Tách cà phê Pour Over ở đây thực sự đưa tôi trở về với những nốt hương nguyên bản nhất.',
    is_featured: true,
  },
];

// ─── SEED ENDPOINT ────────────────────────────────────
seedRoutes.post('/seed', async (c) => {
  const db = c.get('db');
  const results: string[] = [];

  try {
    // 1. Site Settings
    await db.create('site_settings', siteSettings, 'main');
    results.push('✅ site_settings/main');

    // 2. Categories
    for (const cat of categories) {
      const { id, ...data } = cat;
      await db.create('categories', data, id);
      results.push(`✅ categories/${id}`);
    }

    // 3. Menu Items
    for (const item of menuItems) {
      await db.create('menu_items', item);
      results.push(`✅ menu_items/${item.slug}`);
    }

    // 4. Gallery
    for (const img of gallery) {
      await db.create('gallery', img);
      results.push(`✅ gallery/${img.alt}`);
    }

    // 5. Team
    for (const member of team) {
      await db.create('team', member);
      results.push(`✅ team/${member.name}`);
    }

    // 6. Brand Values
    for (const val of brandValues) {
      await db.create('brand_values', val);
      results.push(`✅ brand_values/${val.title}`);
    }

    // 7. Testimonials
    for (const t of testimonials) {
      await db.create('testimonials', t);
      results.push(`✅ testimonials/${t.name}`);
    }

    return c.json({ success: true, seeded: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message, partial: results }, 500);
  }
});
