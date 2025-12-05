import { Product, products, getProductById } from './products';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  productIds: number[];
  comingSoon?: boolean;
  image?: string;
}

export const collections: Collection[] = [
  {
    id: 'rise-drop-01',
    name: 'RISE - DROP 01',
    description: 'Bold graphics and oversized silhouettes define this collection',
    productIds: [3, 1, 2], // GOTHIC BLOOM, VELORIA LIGHT & DARK, HALF ANGEL
    image: '/products/product3.jpg'
  },
  {
    id: 'mystic-nature-drop-02',
    name: 'MYSTIC NATURE - DROP 02',
    description: 'Coming soon - A collection inspired by nature and mysticism',
    productIds: [4], // Modern Jacket
    comingSoon: true,
    image: '/products/product4.jpg'
  }
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}

export function getCollectionProducts(collection: Collection): Product[] {
  return collection.productIds
    .map(id => getProductById(id))
    .filter((product): product is Product => product !== undefined);
}

export function getAllCollections(): Collection[] {
  return collections;
}

