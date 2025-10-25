import { useState } from 'react';
import { useSelector } from 'react-redux';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Cart from '../components/Cart';
import { ShoppingBag } from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Shoe Store</h1>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
              Cart: {cartTotalQuantity}
            </div>
          </div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 mr-96">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Cart />
    </div>
  );
};

export default Shop;
