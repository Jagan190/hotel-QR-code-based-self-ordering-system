import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { menuItems } from '../data/menuItems';
import { ShoppingCart, Plus } from 'lucide-react';

const Menu = () => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const { addToCart, cart } = useStore();

  const filteredItems = selectedCuisine === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.cuisine === selectedCuisine);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="space-x-4">
          <button
            onClick={() => setSelectedCuisine('all')}
            className={`px-4 py-2 rounded ${
              selectedCuisine === 'all' ? 'bg-blue-600' : 'bg-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCuisine('southIndian')}
            className={`px-4 py-2 rounded ${
              selectedCuisine === 'southIndian' ? 'bg-blue-600' : 'bg-white/10'
            }`}
          >
            South Indian
          </button>
          <button
            onClick={() => setSelectedCuisine('mangalorean')}
            className={`px-4 py-2 rounded ${
              selectedCuisine === 'mangalorean' ? 'bg-blue-600' : 'bg-white/10'
            }`}
          >
            Mangalorean
          </button>
          <button
            onClick={() => setSelectedCuisine('chinese')}
            className={`px-4 py-2 rounded ${
              selectedCuisine === 'chinese' ? 'bg-blue-600' : 'bg-white/10'
            }`}
          >
            Chinese
          </button>
        </div>

        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{totalItems}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-blue-400">₹{item.price}</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded transition duration-200"
              >
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;