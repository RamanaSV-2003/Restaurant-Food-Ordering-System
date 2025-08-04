import React, { useState } from 'react';
import { Truck, Clock, MapPin, Phone } from 'lucide-react';

interface DeliveryOptionsProps {
  onDeliverySelect: (option: string, address?: string) => void;
  selectedOption: string;
}

export default function DeliveryOptions({ onDeliverySelect, selectedOption }: DeliveryOptionsProps) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Truck className="h-5 w-5 mr-2 text-amber-600" />
        Delivery Options
      </h2>

      <div className="space-y-4">
        {/* Delivery Option */}
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption === 'delivery' 
              ? 'border-amber-600 bg-amber-50' 
              : 'border-gray-200 hover:border-amber-300'
          }`}
          onClick={() => onDeliverySelect('delivery')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Home Delivery</h3>
                <p className="text-sm text-gray-600">Delivered to your doorstep</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-amber-600">₹40</p>
              <p className="text-xs text-gray-500">Free above ₹500</p>
            </div>
          </div>
          
          {selectedOption === 'delivery' && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address with landmarks"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
            </div>
          )}
        </div>

        {/* Pickup Option */}
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption === 'pickup' 
              ? 'border-amber-600 bg-amber-50' 
              : 'border-gray-200 hover:border-amber-300'
          }`}
          onClick={() => onDeliverySelect('pickup')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Self Pickup</h3>
                <p className="text-sm text-gray-600">Collect from restaurant</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">Free</p>
              <p className="text-xs text-gray-500">No delivery charges</p>
            </div>
          </div>
          
          {selectedOption === 'pickup' && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">The South Bowl Family Restaurant</p>
                  <p className="text-gray-600">Jammalamadugu, Kadapa District, Andhra Pradesh</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">Ready in 20-25 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">+91-9874563210</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}