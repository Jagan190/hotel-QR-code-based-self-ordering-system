import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { customerInfo, cart, total, clearCart } = useStore();

  React.useEffect(() => {
    return () => {
      clearCart();
    };
  }, [clearCart]);

  if (!customerInfo) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-300">Thank you for your order, {customerInfo.name}</p>
        </div>

        <div className="space-y-6">
          <div className="border-t border-white/10 pt-6">
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="space-y-2 text-sm">
              <p>Table Number: {customerInfo.tableNumber}</p>
              <p>Contact: {customerInfo.contactNumber}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-center text-sm text-gray-300 mb-6">
              Your order has been sent to the kitchen. Please wait at your table, and our staff will serve you shortly.
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;