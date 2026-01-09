
export type CategoryType = 'Electronics' | 'Fashion' | 'Home' | 'Beauty' | 'Sports' | 'Other';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: CategoryType;
  subCategory?: string;
  images: string[];
  isFeatured: boolean;
  hasOffer: boolean;
  discountPrice?: number;
  stock: number;
  sellerId: string;
  storeName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: CategoryType;
  image: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
}

export interface StoreDetails {
  storeName: string;
  storeLogo: string;
  accountNumber: string;
  accountDetails: string;
  address: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  isSeller: boolean;
  storeDetails?: StoreDetails;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
  isSeen?: boolean;
  sellerIds?: string[]; // IDs of sellers whose products are in this order
}
