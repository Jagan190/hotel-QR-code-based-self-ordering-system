import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Phone, MapPin } from 'lucide-react';

const CustomerInfo = () => {
  const navigate = useNavigate();
  const setCustomerInfo = useStore((state) => state.setCustomerInfo);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    tableNumber: '12' // Simulated QR code table number
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerInfo(formData);
    navigate('/menu');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Hotel Dining</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Your Name</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Contact Number</span>
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Table Number</span>
            </label>
            <input
              type="text"
              readOnly
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/10"
              value={formData.tableNumber}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Continue to Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerInfo;