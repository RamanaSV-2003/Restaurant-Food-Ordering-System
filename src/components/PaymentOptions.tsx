import { useState } from 'react';
import { CreditCard, Smartphone, Banknote, QrCode } from 'lucide-react';

interface PaymentOptionsProps {
  onPaymentSelect: (method: string) => void;
  selectedMethod: string;
  total: number;
}

export default function PaymentOptions({ onPaymentSelect, selectedMethod, total }: PaymentOptionsProps) {
  const [upiId, setUpiId] = useState('');

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay accepted'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: QrCode,
      description: 'All major banks supported'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when food arrives'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <CreditCard className="h-5 w-5 mr-2 text-amber-600" />
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-amber-600 bg-amber-50'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
              onClick={() => onPaymentSelect(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-amber-600" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      {method.popular && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  )}
                </div>
              </div>

              {selectedMethod === method.id && method.id === 'upi' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@paytm / yourname@gpay"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to choose UPI app during payment
                  </p>
                </div>
              )}

              {selectedMethod === method.id && method.id === 'cod' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please keep exact change ready. COD charges: ₹10 extra
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Amount to Pay:</span>
          <span className="text-amber-600">
            ₹{selectedMethod === 'cod' ? total + 10 : total}
          </span>
        </div>
        {selectedMethod === 'cod' && (
          <p className="text-sm text-gray-600 mt-1">Includes ₹10 COD charges</p>
        )}
      </div>
    </div>
  );
}