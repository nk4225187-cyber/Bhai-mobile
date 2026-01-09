
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, GalleryItem, User, StoreDetails } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_GALLERY } from './constants';

interface StoreSettings {
  address: string;
  phone: string;
  email: string;
}

interface AppContextType {
  products: Product[];
  categories: Category[];
  gallery: GalleryItem[];
  cart: CartItem[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  storeSettings: StoreSettings;
  unreadOrderCount: number;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (p: Product, q: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, q: number) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  registerUser: (user: User) => void;
  loginUser: (email: string, pass: string) => boolean;
  logoutUser: () => void;
  becomeSeller: (details: StoreDetails) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
  markOrdersAsSeen: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: StoreSettings = {
  address: '123 Nova Marketplace, Digital Ave, Karachi',
  phone: '+92 300 0000000',
  email: 'hub@novacommerce.com'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS.map(p => ({ ...p, sellerId: 'admin', storeName: 'Nova Official' }));
  });
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved).map((o: any) => ({ ...o, isSeen: o.isSeen ?? true })) : [];
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('store_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const unreadOrderCount = orders.filter(o => !o.isSeen && (currentUser?.isSeller ? o.sellerIds?.includes(currentUser.id) : true)).length;

  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('app_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('store_settings', JSON.stringify(storeSettings)), [storeSettings]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('current_user', JSON.stringify(currentUser));
    else localStorage.removeItem('current_user');
  }, [currentUser]);

  const addProduct = (p: Product) => setProducts([...products, p]);
  const updateProduct = (p: Product) => setProducts(products.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (id: string) => setCart(cart.filter(item => item.product.id !== id));
  const updateCartQuantity = (id: string, q: number) => {
    if (q <= 0) { removeFromCart(id); return; }
    setCart(cart.map(item => item.product.id === id ? { ...item, quantity: q } : item));
  };

  const clearCart = () => setCart([]);
  
  const placeOrder = (order: Order) => {
    const sellerIds = [...new Set(order.items.map(item => item.product.sellerId))];
    const orderWithStatus = { ...order, isSeen: false, sellerIds };
    setOrders(prev => [...prev, orderWithStatus]);
    clearCart();
  };

  const markOrdersAsSeen = () => {
    setOrders(prev => prev.map(o => {
      // Only mark as seen if the order involves this seller
      if (currentUser?.isSeller && o.sellerIds?.includes(currentUser.id)) {
        return { ...o, isSeen: true };
      }
      return o;
    }));
  };

  const addGalleryItem = (item: GalleryItem) => setGallery([...gallery, item]);
  const deleteGalleryItem = (id: string) => setGallery(gallery.filter(i => i.id !== id));

  const registerUser = (user: User) => {
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
  };

  const loginUser = (email: string, pass: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (found) { setCurrentUser(found); return true; }
    return false;
  };

  const logoutUser = () => setCurrentUser(null);

  const becomeSeller = (details: StoreDetails) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, isSeller: true, storeDetails: details };
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  const updateStoreSettings = (settings: StoreSettings) => setStoreSettings(settings);

  return (
    <AppContext.Provider value={{
      products, categories, gallery, cart, orders, users, currentUser, storeSettings, unreadOrderCount,
      addProduct, updateProduct, deleteProduct, addToCart, removeFromCart, updateCartQuantity, clearCart,
      placeOrder, addGalleryItem, deleteGalleryItem, registerUser, loginUser, logoutUser,
      becomeSeller, updateStoreSettings, markOrdersAsSeen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useStore must be used within AppProvider');
  return context;
};
