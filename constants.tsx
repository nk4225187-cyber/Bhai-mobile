
import { Product, Category, GalleryItem } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', image: 'https://picsum.photos/seed/elec/400/400' },
  { id: '2', name: 'Fashion', image: 'https://picsum.photos/seed/fashion/400/400' },
  { id: '3', name: 'Home', image: 'https://picsum.photos/seed/home/400/400' },
  { id: '4', name: 'Beauty', image: 'https://picsum.photos/seed/beauty/400/400' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Wireless Headphones',
    price: 85000,
    description: 'Experience studio-quality sound with our latest noise-canceling headphones. Perfect for travel and deep focus.',
    category: 'Electronics',
    images: ['https://picsum.photos/seed/head1/800/800', 'https://picsum.photos/seed/head2/800/800'],
    isFeatured: true,
    hasOffer: false,
    stock: 15,
    sellerId: 'admin'
  },
  {
    id: 'p2',
    name: 'Minimalist Cotton Tee',
    price: 4500,
    description: 'A breathable, sustainable cotton t-shirt that fits perfectly. Essential for every wardrobe.',
    category: 'Fashion',
    images: ['https://picsum.photos/seed/tee/800/800'],
    isFeatured: true,
    hasOffer: true,
    discountPrice: 3500,
    stock: 50,
    sellerId: 'admin'
  },
  {
    id: 'p3',
    name: 'Smart Home Hub',
    price: 35000,
    description: 'Control your entire home with one simple device. Integrates with over 5,000 smart products.',
    category: 'Electronics',
    images: ['https://picsum.photos/seed/hub/800/800'],
    isFeatured: false,
    hasOffer: false,
    stock: 10,
    sellerId: 'admin'
  },
  {
    id: 'p4',
    name: 'Silk Skin Moisturizer',
    price: 12000,
    description: 'Organic hydration for glowing skin. Dermatologist tested and cruelty-free.',
    category: 'Beauty',
    images: ['https://picsum.photos/seed/skin/800/800'],
    isFeatured: false,
    hasOffer: true,
    discountPrice: 9500,
    stock: 25,
    sellerId: 'admin'
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'g1', url: 'https://picsum.photos/seed/store1/800/1000', category: 'Store', title: 'Our Main Flagship' },
  { id: 'g2', url: 'https://picsum.photos/seed/prod1/800/1000', category: 'Products', title: 'Summer Collection' },
  { id: 'g3', url: 'https://picsum.photos/seed/event1/800/1000', category: 'Offers', title: 'Holiday Event' },
  { id: 'g4', url: 'https://picsum.photos/seed/store2/800/1000', category: 'Store', title: 'Warehouse View' },
];
