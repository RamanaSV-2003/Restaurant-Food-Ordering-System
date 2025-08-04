import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <div className="header-watermark relative bg-gradient-to-r from-white to-orange-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Authentic Andhra, South Indian, and Rayalaseema
                <span className="text-red-600"> Delicacies</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Experience the rich taste of South India with our authentic vegetarian dishes, traditional Rayalaseema sweets, and refreshing drinks delivered to your doorstep.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage('menu')}
                className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Order Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage('menu')}
                className="flex items-center justify-center space-x-2 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
              >
                <span>View Menu</span>
              </button>
            </div>

            {/* Restaurant Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Open Daily</p>
                  <p className="text-xs text-gray-600">11:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <MapPin className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-xs text-gray-600">Jammalamadugu, Kadapa</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <Phone className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Call Us</p>
                  <p className="text-xs text-gray-600">+91-9874563210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg"
                alt="Authentic Andhra cuisine"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}