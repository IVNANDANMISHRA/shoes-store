import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Star } from 'lucide-react';
import shoes1 from "../public/images/Nike.jpg";
import shoes2 from "../public/images/adidas.jpg";
import shoes3 from "../public/images/Converse.jpg";
import shoes4 from "../public/images/Vans.jpg";
import shoes5 from "../public/images/Nike1.jpg";
import shoes6 from "../public/images/puma.jpg";
const shoes = [
  {
    id: 1,
    name: "Air Max 270",
    brand: "Nike",
    price: 12000,
    originalPrice: 14400,
    image:  shoes1 ,
    rating: 4.8
  },
  {
    id: 2,
    name: "Stan Smith",
    brand: "Adidas",
    price: 6800,
    image:  shoes2 ,
    rating: 4.6
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 5200,
    originalPrice: 6000,
    image: shoes3 ,
    rating: 4.5
  },
  {
    id: 4,
    name: "Old Skool",
    brand: "Vans",
    price: 5600,
    image:  shoes4 ,
    rating: 4.7
  },
  {
    id: 5,
    name: "Air Jordan 1",
    brand: "Nike",
    price: 13600,
    originalPrice: 16000,
    image:  shoes5 ,
    rating: 4.9
  },
  {
    id: 6,
    name: "Ultraboost 22",
    brand: "Puma",
    price: 15200,
    image: shoes6,
    rating: 4.8
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === shoe.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...shoe, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  const deleteFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SoleStore</h1>
              <span className="ml-2 text-sm text-gray-500">Premium Footwear</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{getTotalItems()} items</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shoes Display */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Shoes</h2>
              <p className="text-gray-600">Discover our premium collection of footwear</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shoes.map((shoe) => (
                <div key={shoe.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {shoe.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Sale
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {shoe.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{shoe.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{shoe.name}</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">₹{shoe.price.toLocaleString()}</span>
                        {shoe.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">₹{shoe.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(shoe)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getTotalItems()}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some shoes to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="font-semibold text-indigo-600">₹{item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>

                          <span className="w-8 text-center font-medium">{item.quantity}</span>

                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>

                          <button
                            onClick={() => deleteFromCart(item.id)}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;