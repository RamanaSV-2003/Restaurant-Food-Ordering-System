import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
  user: unknown;
}

export default function Checkout({ cartItems, onBack, onOrderComplete }: CheckoutProps) {
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryCharges = deliveryOption === 'delivery' ? (subtotal > 500 ? 0 : 40) : 0;
  const codCharges = paymentMethod === 'cod' ? 10 : 0;
  const total = subtotal + tax + deliveryCharges + codCharges;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOrderComplete();
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          <DeliveryOptions 
            onDeliverySelect={setDeliveryOption}
            selectedOption={deliveryOption}
          />
          
          <PaymentOptions
            onPaymentSelect={setPaymentMethod}
            selectedMethod={paymentMethod}
            total={total}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              {deliveryCharges > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span>₹{deliveryCharges}</span>
                </div>
              )}
              {codCharges > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">COD Charges</span>
                  <span>₹{codCharges}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Place Order - ₹{total}</span>
              </>
            )}
          </button>

          <div className="text-center text-sm text-gray-500">
            <p>By placing this order, you agree to our terms and conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}