import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerInfo from './components/CustomerInfo';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Payment from './components/Payment';
import { Hotel } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <header className="bg-black/20 backdrop-blur-sm fixed w-full z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hotel className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Hotel Dining</h1>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 pt-24 pb-8">
          <Routes>
            <Route path="/" element={<CustomerInfo />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;