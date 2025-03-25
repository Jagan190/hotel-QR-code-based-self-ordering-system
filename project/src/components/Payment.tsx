import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CreditCard, Smartphone, AlertCircle } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const { total, customerInfo, cart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const sendOrderToKitchen = async () => {
    // Simulate sending order to kitchen
    console.log('Sending order to kitchen:', {
      customerInfo,
      cart,
      total,
      paymentMethod,
      timestamp: new Date().toISOString()
    });
    
    // In a real application, this would be an API call to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate sending order to kitchen
      await sendOrderToKitchen();
      
      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!customerInfo) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

        <div className="mb-6">
          <p className="text-gray-300">Amount to Pay</p>
          <p className="text-3xl font-bold">₹{total.toFixed(2)}</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                className="mr-2"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                UPI Payment
              </span>
            </label>

            <label className="block">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                className="mr-2"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Card Payment
              </span>
            </label>
          </div>

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
                required
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm text-gray-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>This is a demo payment form. No actual payment will be processed.</p>
          </div>

          <button
            type="submit"
            disabled={!paymentMethod || loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing Payment...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;