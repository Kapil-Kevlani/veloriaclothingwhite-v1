export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'VELORIA LIGHT & DARK OVERSIZED GRAPHIC T-SHIRT',
    price: 899,
    image: '/products/product1.jpg',
    images: [
      '/products/product1.jpg',
      '/products/product2.jpg',
      '/products/product3.jpg',
      '/products/product4.jpg'
    ],
    category: 'tops',
    description: 'Step into clean and modern streetwear with the VELORIA THEME OVERSIZED T-SHIRT, designed for people who love premium comfort and soft everyday style. Made from thick 240 GSM terry cotton, this beige unisex tee feels smooth, breathable and strong on the skin. The front carries a simple and minimal Veloria logo, while the back shows the beautiful Veloria theme artwork—a calm, aesthetic design inspired by nature, light and balance. The box-fit oversized style gives a relaxed streetwear look that is easy to wear with cargos, jeans or shorts. Whether you like aesthetic prints, oversized fashion or soft premium tees, this piece gives you a clean and unique vibe. Perfect for daily wear, casual outings or streetwear lovers who want comfort with standout design.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['white', 'black', 'beige']
  },
  {
    id: 2,
    name: 'HALF ANGEL OVERSIZED AESTHETIC GRAPHIC T-SHIRT',
    price: 999,
    image: '/products/product2.jpg',
    images: [
      '/products/product2.jpg',
      '/products/product1.jpg',
      '/products/product3.jpg'
    ],
    category: 'bottoms',
    description: 'Step into bold streetwear style with the HALF ANGEL OVERSIZED T-SHIRT by VELORIA — a premium, soft, and breathable unisex tee made from heavy 240 GSM cotton that feels strong yet gentle on skin. This black oversized tee carries a simple "VELORIA" branding on the front, while its back showcases a striking half-faced angel graphic that brings an alternative, edgy vibe to your outfit. The baggy box-fit silhouette drapes loose and relaxed, giving you that cool, laid-back streetwear look. Whether you pair it with cargos, ripped jeans or layer under a jacket, this tee makes your style speak louder. Comfortable, durable and expressive — it\'s not just a t-shirt, it\'s a statement.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'navy', 'gray']
  },
  {
    id: 3,
    name: 'GOTHIC BLOOM OVERSIZED GRAPHIC T-SHIRT',
    price: 899,
    image: '/products/product3.jpg',
    images: [
      '/products/product3.jpg',
      '/products/product4.jpg',
      '/products/product1.jpg'
    ],
    category: 'dresses',
    description: 'Be bold and stand out with our GOTHIC ART OVERSIZED T-SHIRT — a premium, soft, and breathable unisex tee made from 240 gsm terry cotton. The off-white box-fit gives a relaxed oversized look, perfect for streetwear or casual outfits. On the front you get a small, minimal "Veloria" logo; on the back — an eye-catching gothic art graphic that defines your edgy style.\n\nThis oversized gothic tee is crafted for comfort and style: the heavy cotton makes it durable yet soft, and works great as a baggy tee for men or women. Use it as a grunge oversized t-shirt, a gothic graphic tee, or a statement piece in your street-style wardrobe. Pair it with distressed jeans, cargos, or layered under a jacket — you will always get looks.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'white', 'navy']
  },
  {
    id: 4,
    name: 'Modern Jacket',
    price: 249.00,
    image: '/products/product4.jpg',
    images: [
      '/products/product4.jpg',
      '/products/product2.jpg',
      '/products/product1.jpg'
    ],
    category: 'outerwear',
    description: 'Contemporary design meets classic tailoring. This modern jacket is a versatile addition to any wardrobe.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'gray', 'beige']
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}
