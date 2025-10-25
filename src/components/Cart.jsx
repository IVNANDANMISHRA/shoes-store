import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, X } from 'lucide-react';
import { useState } from 'react';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleProceedToPayment = () => {
    if (cart.items.length > 0) {
      navigate('/payment');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <ShoppingBag size={24} />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.totalQuantity}
          </span>
        )}
      </button>

      <div className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl overflow-y-auto z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={24} />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{cart.totalQuantity}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-blue-600">${cart.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              <CreditCard size={20} />
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>

    {isOpen && (
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      />
    )}
    </>
  );
};

export default Cart;
