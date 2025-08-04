import { Plus, Star } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="menu-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-900">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
            {item.category}
          </span>
          
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}