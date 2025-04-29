import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Sample product data
  const allProducts = [
    {
      id: 1,
      name: 'Smartphone X',
      category: 'Phones',
      price: 799.99,
      rating: 4.5,
      image: 'image/jw.avif',
      description: 'Latest smartphone with advanced camera features', 
      inStock: true
    },
    {
      id: 2,
      name: 'Laptop Pro',
      category: 'Laptops',
      price: 1299.99,
      rating: 4.7,
      image: 'image/fpic.jpg',
      description: 'Powerful laptop for professionals and creatives',
      inStock: true
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      category: 'Accessories',
      price: 149.99,
      rating: 4.2,
      image: 'image/sec.jpg',
      description: 'Noise-cancelling wireless earbuds with long battery life',
      inStock: false
    },
    {
      id: 4,
      name: 'Smart Watch',
      category: 'Wearables',
      price: 249.99,
      rating: 4.3,
      image: 'image/third.jpg',
      description: 'Track your fitness and stay connected',
      inStock: true
    },
    {
      id: 5,
      name: 'Tablet Lite',
      category: 'Tablets',
      price: 349.99,
      rating: 4.0,
      image:  'image/four.jpg',
      description: 'Lightweight tablet for entertainment and productivity',
      inStock: true
    },
    {
      id: 6,
      name: 'Gaming Console',
      category: 'Gaming',
      price: 499.99,
      rating: 4.8,
      image:  'image/thi.jpg',
      description: 'Next-gen gaming console with 4K resolution',
      inStock: true
    },
  ];

  // State management
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get unique categories for filter
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (featured)
        break;
    }

    setProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortOption]);

  // Handle product selection
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Render product listing
  const renderProductListing = () => (
    <div className="product-listing">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} onClick={() => handleProductClick(product)} />
              <div className="product-info">
                <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
                <div className="product-meta">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className="rating">★ {product.rating}</span>
                  {!product.inStock && <span className="out-of-stock">Out of Stock</span>}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  disabled={!product.inStock}
                  className={!product.inStock ? 'disabled' : ''}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
            <button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setPriceRange([0, 2000]);
              setSortOption('featured');
            }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render product details
  const renderProductDetails = () => (
    <div className="product-details">
      <button onClick={() => setSelectedProduct(null)} className="back-button">
        &larr; Back to Products
      </button>
      <div className="details-container">
        <div className="details-image">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
        <div className="details-info">
          <h1>{selectedProduct.name}</h1>
          <div className="details-meta">
            <span className="price">${selectedProduct.price.toFixed(2)}</span>
            <span className="rating">★ {selectedProduct.rating}</span>
            <span className="category">{selectedProduct.category}</span>
            {!selectedProduct.inStock && <span className="out-of-stock">Out of Stock</span>}
          </div>
          <p className="description">{selectedProduct.description}</p>
          <button 
            onClick={() => handleAddToCart(selectedProduct)} 
            disabled={!selectedProduct.inStock}
            className={!selectedProduct.inStock ? 'disabled' : ''}
          >
            {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );

  // Render home page
  const renderHomePage = () => (
    <div className="home-page">
      <section className="hero">
        <h1> I'M JANVIERE Welcome to online electronic selling</h1>
        <p>this campany is in top for selling electronic device</p>
      </section>

      <div className="search-and-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <i className="search-icon">🔍</i>
          </button>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="price">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {selectedProduct ? renderProductDetails() : renderProductListing()}
    </div>
  );

  // Render about page
  const renderAboutPage = () => (
    <div className="about-page">
      <h1>About ABC Company</h1>
      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            ABC Company was founded in 2015 in Rwamagana District, Eastern Province, Rwanda.
            We started as a small electronics retailer and have grown into a leading e-commerce
            platform specializing in high-quality electronics.
          </p>
        </section>
        
        <section>
          <h2>Our Mission</h2>
          <p>
            To provide Rwandans with access to the latest electronics at competitive prices,
            delivered with excellent customer service and after-sales support.
          </p>
        </section>
        
        <section>
          <h2>Our Location</h2>
          <p>
            We are proudly based in Rwamagana District, Eastern Province, Rwanda.
            Our warehouse and offices are located in the heart of the city, serving customers
            across the country through our efficient delivery network.
          </p>
        </section>
        
        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-image">👨🏾</div>
              <h3>Jean de Dieu</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <div className="member-image">👩🏾</div>
              <h3>Marie Claire</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <div className="member-image">👨🏾</div>
              <h3>Paul</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Render contact page
  const renderContactPage = () => (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Address:</strong> KN 123 St, Rwamagana District, Eastern Province, Rwanda</p>
          <p><strong>Phone:</strong> +250 788 123 456</p>
          <p><strong>Email:</strong> info@abccompany.rw</p>
          <p><strong>Working Hours:</strong> Monday - Friday: 8:00 AM - 5:00 PM</p>
          
          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </section>
        
        <section className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" rows="5" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );

  // Render cart page
  const renderCartPage = () => (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => setCart(cart.filter((_, i) => i !== index))}
                  className="remove-item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(cart.reduce((sum, item) => sum + item.price, 0) + 5).toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => setCurrentPage('home')}>Continue Shopping</button>
        </div>
      )}
    </div>
  );

  // Main render function
  return (
    <div className="app">
      {/* Header with navigation */}
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={() => {
            setCurrentPage('home');
            setSelectedProduct(null);
          }}>
            ABC Electronics
          </div>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
          
          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li className={currentPage === 'home' ? 'active' : ''}>
                <button onClick={() => {
                  setCurrentPage('home');
                  setSelectedProduct(null);
                  setIsMobileMenuOpen(false);
                }}>
                  Home
                </button>
              </li>
              <li className={currentPage === 'about' ? 'active' : ''}>
                <button onClick={() => {
                  setCurrentPage('about');
                  setIsMobileMenuOpen(false);
                }}>
                  About Us
                </button>
              </li>
              <li className={currentPage === 'contact' ? 'active' : ''}>
                <button onClick={() => {
                  setCurrentPage('contact');
                  setIsMobileMenuOpen(false);
                }}>
                  Contact
                </button>
              </li>
              <li className="cart-icon">
                <button onClick={() => {
                  setCurrentPage('cart');
                  setIsMobileMenuOpen(false);
                }}>
                  🛒 ({cart.length})
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'contact' && renderContactPage()}
        {currentPage === 'cart' && renderCartPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
              <li><button onClick={() => setCurrentPage('about')}>About Us</button></li>
              <li><button onClick={() => setCurrentPage('contact')}>Contact</button></li>
              <li><button onClick={() => setCurrentPage('cart')}>My Cart</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              {categories.filter(cat => cat !== 'All').map(category => (
                <li key={category}>
                  <button onClick={() => {
                    setCurrentPage('home');
                    setSelectedCategory(category);
                    setSelectedProduct(null);
                  }}>
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>KN 123 St, Rwamagana</p>
            <p>Eastern Province, Rwanda</p>
            <p>Phone: +250 788 123 456</p>
            <p>Email: info@abccompany.rw</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ABC Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;