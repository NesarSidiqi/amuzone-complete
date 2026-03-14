// ShopWave – Mock Data Store
// Design: Sunrise Marketplace (Warm Modernism + Editorial Commerce)

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  badge?: "sale" | "new" | "bestseller";
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "Zap",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-electronics-NNjdtAbKKHsymZQagVH5DX.webp",
    productCount: 248,
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-fashion-SvtaJQxqfPX5bSLuhNeYgH.webp",
    productCount: 512,
  },
  {
    id: "home",
    name: "Home & Living",
    icon: "Home",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-home-JrauHpnuaW9osE7DPWNXXB.webp",
    productCount: 184,
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    productCount: 96,
  },
  {
    id: "sports",
    name: "Sports",
    icon: "Dumbbell",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    productCount: 143,
  },
  {
    id: "books",
    name: "Books",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    productCount: 320,
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: "Gamepad2",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    productCount: 77,
  },
  {
    id: "food",
    name: "Food & Grocery",
    icon: "ShoppingBasket",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    productCount: 210,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    price: 279.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 2847,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
    ],
    category: "electronics",
    subcategory: "Headphones",
    badge: "sale",
    description: "Industry-leading noise canceling with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30-hour battery life with quick charging.",
    features: ["Industry-leading noise canceling", "30-hour battery life", "Multipoint connection", "Speak-to-Chat technology", "Foldable design"],
    inStock: true,
    stockCount: 42,
    tags: ["wireless", "noise-canceling", "premium", "bluetooth"],
    isFeatured: true,
  },
  {
    id: "p2",
    name: "Apple Watch Series 9 GPS",
    brand: "Apple",
    price: 399.00,
    rating: 4.9,
    reviewCount: 5621,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
    ],
    category: "electronics",
    subcategory: "Smartwatches",
    badge: "new",
    description: "The most advanced Apple Watch yet. Carbon neutral. Brighter display. Double Tap gesture. Precision Finding for iPhone.",
    features: ["S9 SiP chip", "Double Tap gesture", "Precision Finding", "Carbon neutral", "18-hour battery"],
    inStock: true,
    stockCount: 18,
    tags: ["smartwatch", "fitness", "apple", "health"],
    isFeatured: true,
  },
  {
    id: "p3",
    name: "IPL Hair Removel",
    brand: "Amuzone",
    price: 2199,
    originalPrice: 2600,
    rating: 4.6,
    reviewCount: 53,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    category: "fashion",
    subcategory: "Knitwear",
    badge: "sale",
    description: "Crafted from Grade-A Mongolian cashmere. Incredibly soft, lightweight, and warm. A wardrobe essential that gets better with every wear.",
    features: ["100% Grade-A Mongolian cashmere", "Ribbed cuffs and hem", "Classic crewneck fit", "Machine washable", "Available in 8 colors"],
    inStock: true,
    stockCount: 67,
    tags: ["cashmere", "luxury", "knitwear", "winter"],
    isFeatured: true,
  },
  {
    id: "p4",
    name: "Leather Tote Bag",
    brand: "Cuyana",
    price: 245.00,
    rating: 4.7,
    reviewCount: 1203,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    category: "fashion",
    subcategory: "Bags",
    badge: "bestseller",
    description: "Full-grain Italian leather tote with interior organization. Designed to last a lifetime. Ethically made in Italy.",
    features: ["Full-grain Italian leather", "Interior zip pocket", "Magnetic closure", "Removable pouch", "Fits 13\" laptop"],
    inStock: true,
    stockCount: 23,
    tags: ["leather", "tote", "luxury", "italian"],
    isFeatured: true,
  },
  {
    id: "p5",
    name: "Ceramic Diffuser Set",
    brand: "Vitruvi",
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.8,
    reviewCount: 674,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80",
    ],
    category: "home",
    subcategory: "Aromatherapy",
    badge: "sale",
    description: "Stone diffuser with ultrasonic technology. Covers up to 500 sq ft. Includes 3 essential oil blends. Auto shut-off for safety.",
    features: ["Ultrasonic technology", "500 sq ft coverage", "7-hour runtime", "Auto shut-off", "Includes 3 oil blends"],
    inStock: true,
    stockCount: 31,
    tags: ["aromatherapy", "home", "wellness", "ceramic"],
  },
  {
    id: "p6",
    name: "iPad Pro 12.9\" M2",
    brand: "Apple",
    price: 1099.00,
    rating: 4.9,
    reviewCount: 3241,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    ],
    category: "electronics",
    subcategory: "Tablets",
    badge: "new",
    description: "The ultimate iPad experience with the M2 chip. Liquid Retina XDR display. Apple Pencil hover. ProRes video. Wi-Fi 6E.",
    features: ["M2 chip", "Liquid Retina XDR", "Apple Pencil hover", "ProRes video", "Wi-Fi 6E"],
    inStock: true,
    stockCount: 12,
    tags: ["tablet", "apple", "m2", "professional"],
    isFeatured: true,
  },
  {
    id: "p7",
    name: "Linen Throw Blanket",
    brand: "Parachute",
    price: 89.00,
    rating: 4.7,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "home",
    subcategory: "Bedding",
    badge: "bestseller",
    description: "European flax linen throw. Pre-washed for immediate softness. Gets softer with every wash. Perfect for all seasons.",
    features: ["100% European flax linen", "Pre-washed", "Oeko-Tex certified", "Machine washable", "50\" x 60\""],
    inStock: true,
    stockCount: 55,
    tags: ["linen", "home", "cozy", "sustainable"],
  },
  {
    id: "p8",
    name: "Nespresso Vertuo Next",
    brand: "Nespresso",
    price: 149.00,
    originalPrice: 199.00,
    rating: 4.5,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ],
    category: "home",
    subcategory: "Kitchen",
    badge: "sale",
    description: "Next generation coffee machine with Centrifusion technology. 5 cup sizes from espresso to alto. Bluetooth connectivity.",
    features: ["Centrifusion technology", "5 cup sizes", "Bluetooth connected", "Eco-design", "60-second heat-up"],
    inStock: true,
    stockCount: 28,
    tags: ["coffee", "kitchen", "nespresso", "appliance"],
  },
  {
    id: "p9",
    name: "Vitamin C Serum",
    brand: "SkinCeuticals",
    price: 182.00,
    rating: 4.8,
    reviewCount: 2109,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    ],
    category: "beauty",
    subcategory: "Skincare",
    badge: "bestseller",
    description: "CE Ferulic combines 15% pure vitamin C with 1% vitamin E and 0.5% ferulic acid. Provides advanced environmental protection.",
    features: ["15% L-ascorbic acid", "1% vitamin E", "0.5% ferulic acid", "Antioxidant protection", "Dermatologist tested"],
    inStock: true,
    stockCount: 44,
    tags: ["skincare", "vitamin-c", "serum", "anti-aging"],
  },
  {
    id: "p10",
    name: "Yoga Mat Pro",
    brand: "Manduka",
    price: 138.00,
    rating: 4.9,
    reviewCount: 3872,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    ],
    category: "sports",
    subcategory: "Yoga",
    badge: "bestseller",
    description: "The PRO mat is the gold standard in yoga mats. Unmatched cushioning, stability, and durability. Lifetime guarantee.",
    features: ["6mm cushioning", "Closed-cell surface", "Lifetime guarantee", "Non-toxic materials", "71\" x 26\""],
    inStock: true,
    stockCount: 76,
    tags: ["yoga", "fitness", "wellness", "exercise"],
  },
  {
    id: "p11",
    name: "Atomic Habits",
    brand: "James Clear",
    price: 18.99,
    originalPrice: 27.00,
    rating: 4.9,
    reviewCount: 87432,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    ],
    category: "books",
    subcategory: "Self-Help",
    badge: "bestseller",
    description: "The #1 New York Times bestseller. Tiny changes, remarkable results. An easy & proven way to build good habits & break bad ones.",
    features: ["Hardcover", "320 pages", "NYT Bestseller", "International bestseller", "Practical framework"],
    inStock: true,
    stockCount: 200,
    tags: ["habits", "self-help", "productivity", "bestseller"],
  },
  {
    id: "p12",
    name: "Wireless Charging Pad",
    brand: "Anker",
    price: 35.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 5241,
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
    ],
    category: "electronics",
    subcategory: "Accessories",
    badge: "sale",
    description: "15W fast wireless charging pad compatible with all Qi-enabled devices. Multi-device charging. LED indicator.",
    features: ["15W fast charging", "Qi compatible", "Multi-device", "Anti-slip surface", "LED indicator"],
    inStock: true,
    stockCount: 89,
    tags: ["wireless", "charging", "accessories", "tech"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    title: "Best headphones I've ever owned",
    body: "The noise canceling is absolutely incredible. I use these on my daily commute and they completely block out all the noise. Sound quality is top-notch and the battery life is amazing.",
    date: "2024-12-15",
    verified: true,
  },
  {
    id: "r2",
    productId: "p1",
    author: "James K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 4,
    title: "Great headphones, minor comfort issue",
    body: "Sound quality and noise canceling are excellent. My only complaint is they get a bit uncomfortable after 3+ hours of use. Otherwise perfect.",
    date: "2024-11-28",
    verified: true,
  },
  {
    id: "r3",
    productId: "p2",
    author: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    title: "Life-changing fitness tracker",
    body: "I've been using this for 3 months and it's completely changed how I approach my health. The heart rate monitoring is accurate and the sleep tracking is incredibly detailed.",
    date: "2025-01-10",
    verified: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

export function getDiscountPercent(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
