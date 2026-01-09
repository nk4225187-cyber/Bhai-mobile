
import React, { useState, useEffect } from 'react';
import { AppProvider, useStore } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import CategoryProducts from './pages/CategoryProducts';
import CustomerAuth from './pages/CustomerAuth';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(() => localStorage.getItem('last_page') || 'home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [returnTo, setReturnTo] = useState<string>('home');

  useEffect(() => {
    localStorage.setItem('last_page', currentPage);
  }, [currentPage]);

  const navigate = (page: string, id?: string) => {
    if (page === 'login') {
      if (['product', 'cart', 'checkout'].includes(currentPage)) setReturnTo(currentPage);
    }
    if (id) {
      if (page === 'product') setSelectedProductId(id);
      if (page === 'category') setSelectedCategory(id);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={navigate} />;
      case 'shop': return <Shop navigate={navigate} />;
      case 'product': return <ProductDetail productId={selectedProductId!} navigate={navigate} />;
      case 'cart': return <Cart navigate={navigate} />;
      case 'checkout': return <Checkout navigate={navigate} />;
      case 'gallery': return <Gallery />;
      case 'admin': return <Admin />;
      case 'login': return <CustomerAuth navigate={navigate} returnTo={returnTo} />;
      case 'category': return <CategoryProducts categoryName={selectedCategory!} navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  const isAuthPage = currentPage === 'login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar navigate={navigate} current={currentPage} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAuthPage && <Footer navigate={navigate} />}
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
