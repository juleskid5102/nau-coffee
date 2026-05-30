export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categorySlug: string;
  featured: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatar: string;
}

// Placeholder images from picsum (will be replaced with real photos)
const img = (id: number, w = 800, h = 600) =>
  `https://picsum.photos/seed/nau${id}/${w}/${h}`;

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Cà phê truyền thống',
    slug: 'ca-phe-truyen-thong',
    description: 'Hương vị đậm đà từ những hạt cà phê Việt Nam',
    image: img(101),
    order: 1,
  },
  {
    id: 'cat-2',
    name: 'Cà phê đặc biệt',
    slug: 'ca-phe-dac-biet',
    description: 'Specialty coffee pha chế theo phong cách riêng',
    image: img(102),
    order: 2,
  },
  {
    id: 'cat-3',
    name: 'Trà & Matcha',
    slug: 'tra-matcha',
    description: 'Trà xanh Nhật Bản và các loại trà thượng hạng',
    image: img(103),
    order: 3,
  },
  {
    id: 'cat-4',
    name: 'Đồ uống đá xay',
    slug: 'do-uong-da-xay',
    description: 'Smoothie và đá xay mát lạnh',
    image: img(104),
    order: 4,
  },
  {
    id: 'cat-5',
    name: 'Bánh & Snack',
    slug: 'banh-snack',
    description: 'Bánh ngọt handmade và snack kèm cà phê',
    image: img(105),
    order: 5,
  },
];

export const menuItems: MenuItem[] = [
  // Cà phê truyền thống
  {
    id: 'item-1',
    name: 'Cà phê sữa đá',
    slug: 'ca-phe-sua-da',
    description: 'Cà phê phin truyền thống pha với sữa đặc, thêm đá viên. Vị đậm đà, ngọt béo, thức uống kinh điển Sài Gòn.',
    price: 35000,
    image: img(201),
    categoryId: 'cat-1',
    categorySlug: 'ca-phe-truyen-thong',
    featured: true,
    tags: ['best-seller', 'hot'],
  },
  {
    id: 'item-2',
    name: 'Cà phê đen đá',
    slug: 'ca-phe-den-da',
    description: 'Cà phê đen nguyên chất, pha phin chậm rãi. Đắng nhẹ, hậu ngọt sâu, dành cho người sành cà phê.',
    price: 30000,
    image: img(202),
    categoryId: 'cat-1',
    categorySlug: 'ca-phe-truyen-thong',
    featured: false,
    tags: [],
  },
  {
    id: 'item-3',
    name: 'Bạc xỉu',
    slug: 'bac-xiu',
    description: 'Nhiều sữa, ít cà phê — nhẹ nhàng, béo ngậy, hoàn hảo cho ai mới bắt đầu.',
    price: 35000,
    image: img(203),
    categoryId: 'cat-1',
    categorySlug: 'ca-phe-truyen-thong',
    featured: false,
    tags: [],
  },
  {
    id: 'item-4',
    name: 'Cà phê trứng',
    slug: 'ca-phe-trung',
    description: 'Lớp kem trứng mịn màng phủ trên cà phê đen đậm. Sáng tạo Hà Nội, hương vị độc đáo.',
    price: 45000,
    image: img(204),
    categoryId: 'cat-1',
    categorySlug: 'ca-phe-truyen-thong',
    featured: true,
    tags: ['new'],
  },

  // Cà phê đặc biệt
  {
    id: 'item-5',
    name: 'Espresso',
    slug: 'espresso',
    description: 'Shot espresso chuẩn Ý từ máy chuyên nghiệp. Crema vàng óng, vị mạnh mẽ.',
    price: 40000,
    image: img(205),
    categoryId: 'cat-2',
    categorySlug: 'ca-phe-dac-biet',
    featured: false,
    tags: [],
  },
  {
    id: 'item-6',
    name: 'Cappuccino',
    slug: 'cappuccino',
    description: 'Espresso, sữa nóng và bọt sữa mịn. Cân bằng hoàn hảo giữa đậm đà và mềm mại.',
    price: 55000,
    image: img(206),
    categoryId: 'cat-2',
    categorySlug: 'ca-phe-dac-biet',
    featured: true,
    tags: ['best-seller'],
  },
  {
    id: 'item-7',
    name: 'Caramel Macchiato',
    slug: 'caramel-macchiato',
    description: 'Lớp caramel sánh mịn hòa quyện cùng espresso và sữa tươi. Ngọt nhẹ, thơm nồng.',
    price: 60000,
    image: img(207),
    categoryId: 'cat-2',
    categorySlug: 'ca-phe-dac-biet',
    featured: true,
    tags: ['hot'],
  },
  {
    id: 'item-8',
    name: 'Cold Brew',
    slug: 'cold-brew',
    description: 'Cà phê ủ lạnh 18 tiếng. Mượt mà, ít acid, vị thanh mát tự nhiên.',
    price: 50000,
    image: img(208),
    categoryId: 'cat-2',
    categorySlug: 'ca-phe-dac-biet',
    featured: false,
    tags: ['new'],
  },

  // Trà & Matcha
  {
    id: 'item-9',
    name: 'Matcha Latte',
    slug: 'matcha-latte',
    description: 'Bột matcha Nhật Bản đánh nhuyễn với sữa tươi. Vị trà xanh đậm, creamy.',
    price: 55000,
    image: img(209),
    categoryId: 'cat-3',
    categorySlug: 'tra-matcha',
    featured: true,
    tags: ['best-seller'],
  },
  {
    id: 'item-10',
    name: 'Trà đào cam sả',
    slug: 'tra-dao-cam-sa',
    description: 'Trà pha cùng đào tươi, cam vắt và sả thơm. Thanh mát, giải nhiệt tuyệt vời.',
    price: 45000,
    image: img(210),
    categoryId: 'cat-3',
    categorySlug: 'tra-matcha',
    featured: false,
    tags: ['hot'],
  },

  // Đồ uống đá xay
  {
    id: 'item-11',
    name: 'Chocolate Frappuccino',
    slug: 'chocolate-frappuccino',
    description: 'Chocolate Bỉ xay cùng đá và kem tươi. Ngọt ngào, mát lạnh.',
    price: 60000,
    image: img(211),
    categoryId: 'cat-4',
    categorySlug: 'do-uong-da-xay',
    featured: false,
    tags: [],
  },
  {
    id: 'item-12',
    name: 'Cookies & Cream',
    slug: 'cookies-cream',
    description: 'Oreo xay nhuyễn với kem vanilla và sữa tươi. Béo ngậy, giòn giòn.',
    price: 60000,
    image: img(212),
    categoryId: 'cat-4',
    categorySlug: 'do-uong-da-xay',
    featured: false,
    tags: ['new'],
  },

  // Bánh & Snack
  {
    id: 'item-13',
    name: 'Croissant bơ Pháp',
    slug: 'croissant-bo-phap',
    description: 'Croissant nướng giòn, nhiều lớp bơ thơm lừng. Kết hợp hoàn hảo với cà phê.',
    price: 35000,
    image: img(213),
    categoryId: 'cat-5',
    categorySlug: 'banh-snack',
    featured: true,
    tags: [],
  },
  {
    id: 'item-14',
    name: 'Tiramisu',
    slug: 'tiramisu',
    description: 'Bánh tiramisu homemade, lớp mascarpone mịn và cà phê espresso đậm đà.',
    price: 55000,
    image: img(214),
    categoryId: 'cat-5',
    categorySlug: 'banh-snack',
    featured: false,
    tags: ['best-seller'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Minh Anh',
    content: 'Cà phê ở đây ngon lắm! Không gian yên tĩnh, nhân viên thân thiện. Mình hay đến đây để làm việc và thưởng thức cà phê mỗi sáng.',
    rating: 5,
    avatar: img(301, 100, 100),
  },
  {
    id: 'test-2',
    name: 'Thanh Tùng',
    content: 'Cold Brew ở Nâu là ngon nhất mà mình từng uống. Mượt mà, không gắt, uống xong muốn quay lại ngay.',
    rating: 5,
    avatar: img(302, 100, 100),
  },
  {
    id: 'test-3',
    name: 'Hương Giang',
    content: 'Matcha Latte chuẩn vị Nhật, không quá ngọt. Quán trang trí rất đẹp, check-in sống ảo cực kỳ.',
    rating: 4,
    avatar: img(303, 100, 100),
  },
  {
    id: 'test-4',
    name: 'Đức Phong',
    content: 'Croissant bơ Pháp ở đây tuyệt vời. Giòn, thơm, ăn kèm cà phê đen thì không chê vào đâu được.',
    rating: 5,
    avatar: img(304, 100, 100),
  },
];

// Helper: format price to VND
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Helper: get featured items
export function getFeaturedItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

// Helper: get items by category
export function getItemsByCategory(categorySlug: string): MenuItem[] {
  return menuItems.filter((item) => item.categorySlug === categorySlug);
}

// Helper: get item by slug
export function getItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((item) => item.slug === slug);
}

// Helper: get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}
