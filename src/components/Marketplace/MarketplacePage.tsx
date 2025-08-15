import React from 'react';
import { ShoppingBag, Clock, Star } from 'lucide-react';

const MarketplacePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gold-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace Coming Soon</h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We're working hard to bring you an amazing marketplace where PPMK members can buy, sell, and trade items within our community. From Korean textbooks to K-Pop merchandise, it'll be your one-stop shop for all things Korean culture!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <ShoppingBag className="w-8 h-8 text-gold-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Buy & Sell</h3>
            <p className="text-sm text-gray-600">Trade Korean textbooks, merchandise, and cultural items safely within our community</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <Star className="w-8 h-8 text-gold-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Trusted Community</h3>
            <p className="text-sm text-gray-600">All transactions happen between verified PPMK members for your safety and peace of mind</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <Clock className="w-8 h-8 text-gold-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600">We're putting the finishing touches on this feature. Stay tuned for updates!</p>
          </div>
        </div>
        
        <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
          <h3 className="font-semibold text-gold-800 mb-2">Want to be notified when it launches?</h3>
          <p className="text-gold-700 mb-4">Join our announcement channel to be the first to know when the marketplace goes live!</p>
          <button className="px-6 py-2 bg-gold-400 text-white rounded-lg hover:bg-gold-500 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
