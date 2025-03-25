import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, updateQuantity, removeFromCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Your Order</h2>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-300">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded bg-white/5 hover:bg-white/10"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded bg-white/5 hover:bg-white/10"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">Total Amount</span>
          <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 px-6 py-3 rounded bg-white/10 hover:bg-white/20"
          >
            Add More Items
          </button>
          <button
            onClick={() => navigate('/payment')}
            className="flex-1 px-6 py-3 rounded bg-blue-600 hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;