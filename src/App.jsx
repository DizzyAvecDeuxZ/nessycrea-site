import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './Cart/CartContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import Toast from './components/UI/Toast';
import ScrollProgress from './components/UI/ScrollProgress';
import PageTransition from './components/UI/PageTransition';
import ChristmasDecor from './components/UI/ChristmasDecor';
import useScrollToTop from './hooks/useScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

function AnimatedRoutes({ onAddToCart }) {
  const location = useLocation();
  useScrollToTop();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home onAddToCart={onAddToCart} />
          </PageTransition>
        } />
        <Route path="/boutique" element={
          <PageTransition>
            <Shop onAddToCart={onAddToCart} />
          </PageTransition>
        } />
        <Route path="/a-propos" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (productName) => {
    setToastMessage(`${productName} ajouté au panier`);
    setShowToast(true);
  };

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <ScrollProgress />
          <ChristmasDecor />
          <Navbar />
          <div className="flex-1">
            <AnimatedRoutes onAddToCart={handleAddToCart} />
          </div>
          <Footer />
          <CartDrawer />
          <Toast
            message={toastMessage}
            isVisible={showToast}
            onClose={() => setShowToast(false)}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
