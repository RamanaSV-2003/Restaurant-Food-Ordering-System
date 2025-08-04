import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Checkout from './components/Checkout';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurant-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('restaurant-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    // In a real app, this would integrate with Supabase Auth
    console.log('Auth attempt:', { email, isSignUp });
    
    // Simulate successful auth
    setUser({ email });
    setCurrentPage('home');
    
    if (isSignUp) {
      alert('Account created successfully! Welcome to Siliveri\'s Family Restaurant!');
    } else {
      alert('Welcome back!');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image_url: item.image_url
      }]);
    }
    
    // Show success message
    alert(`${item.name} added to cart!`);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      setCurrentPage('auth');
      return;
    }
    
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    alert('🎉 Order placed successfully! You will receive a confirmation message shortly.\n\nOrder ID: #' + Math.random().toString(36).substr(2, 9).toUpperCase() + '\n\nThank you for choosing The South Bowl Family Restaurant!');
    setCartItems([]);
    setCurrentPage('profile');
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <Menu onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'auth':
        return <Auth onAuth={handleAuth} setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile user={user} setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onBack={() => setCurrentPage('cart')}
            onOrderComplete={handleOrderComplete}
            user={user}
          />
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemsCount={cartItemsCount}
        user={user}
        onSignOut={handleSignOut}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;