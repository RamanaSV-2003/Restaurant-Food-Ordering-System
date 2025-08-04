import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  setCurrentPage: (page: string) => void;
}

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, setCurrentPage }: CartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Looks like you haven't added any delicious items to your cart yet.</p>
          </div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Browse Menu</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('menu')}
          className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-amber-600 font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-600 rounded-full transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">₹{Math.round(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-medium">₹{subtotal > 500 ? 0 : 40}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">₹{Math.round(total + (subtotal > 500 ? 0 : 40))}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              {subtotal > 500 ? '🎉 Free delivery on orders above ₹500!' : '🚚 Add ₹' + (500 - subtotal) + ' more for free delivery'}
            </p>
          </div>

          <button
            onClick={onCheckout}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
}