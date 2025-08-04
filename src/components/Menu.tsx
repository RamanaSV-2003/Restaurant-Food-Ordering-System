import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import MenuCard from './MenuCard';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
}

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample menu data - in a real app, this would come from Supabase
  const sampleMenuItems: MenuItem[] = [
    // Andhra Specials
    {
      id: 1,
      name: "Natukodi Pulusu (Country Chicken Curry)",
      description: "Rustic Andhra‑style country chicken curry with tamarind, coconut and traditional spice paste",
      price: 320,
      image_url:('/Natukodi Pulusu (Country Chicken Curry).png'),
      category: "Andhra Specials",
      rating: 4.7
    },
    {
      id: 2,
      name: "Gongura Mutton",
      description: "Mutton cooked in tangy gongura (sorrel leaves) paste with green chilies and spices",
      price: 350,
      image_url:('/Gongura Mutton.png'),
      category: "Andhra Specials",
      rating: 4.6
    },
    {
      id: 3,
      name: "Kodi Vepudu (Chicken Fry)",
      description: "Crispy spiced chicken fry with Andhra chili and pepper marination",
      price: 280,
      image_url:('/Kodi Vepudu (Chicken Fry).png'),
      category: "Andhra Specials",
      rating: 4.5
    },
    {
      id: 4,
      name: "Royyala Iguru (Prawn Curry)",
      description: "Tangy prawn curry with tamarind and aromatic Andhra spices",
      price: 360,
      image_url: ('/Royyala Iguru Recipe _ Andhra Style Royyala Vepudu.png'),
      category: "Andhra Specials",
      rating: 4.8
    },
    {
      id: 5,
      name: "Ulavacharu with Rice",
      description: "Horse gram gravy served with steamed white rice, a healthy and traditional coastal Andhra dish",
      price: 220,
      image_url: ('/Ulava Charu Recipe - Spicy Andhra Horse Gram Rasam  Recipe - Complete Guide.png'),
      category: "Andhra Specials",
      rating: 4.4
    },
    {
      id: 6,
      name: "Andhra Fish Curry",
      description: "Spicy coastal fish curry cooked in tamarind and chili paste",
      price: 340,
      image_url:('/Andhra Fish Curry.png'),
      category: "Andhra Specials",
      rating: 4.5
    },
    {
      id: 7,
      name: "Avakaya Biryani",
      description: "Biryani flavored with fiery Andhra mango pickle masala",
      price: 300,
      image_url:('/Avakaya Biryani.png'),
      category: "Andhra Specials",
      rating: 4.6
    },
    {
      id: 8,
      name: "Tomato Pappu",
      description: "Simple Andhra dal cooked with tomatoes, garlic, and mild spices",
      price: 180,
      image_url:('/Tomato Pappu.png'),
      category: "Andhra Specials",
      rating: 4.3
    },
    {
      id: 9,
      name: "Gutti Vankaya Kura",
      description: "Stuffed brinjal curry with spiced peanut‑coconut filling",
      price: 260,
      image_url:('/Gutti Vankaya Kura _ Stuffed Brinjal Curry.png'),
      category: "Andhra Specials",
      rating: 4.7
    },
    {
      id: 10,
      name: "Pesarattu with Allam Chutney",
      description: "Green gram dosa served with tangy ginger‑tamarind chutney",
      price: 150,
      image_url:('/Pesarattu with Allam Chutney.png'),
      category: "Andhra Specials",
      rating: 4.8
    },

    // South India
    {
      id: 11,
      name: "Idli with Sambar",
      description: "Steamed rice cakes served with South Indian lentil‑vegetable stew",
      price: 120,
      image_url:('/Idli with Sambar.png'),
      category: "South India",
      rating: 4.9
    },
    {
      id: 12,
      name: "Medu Vada",
      description: "Crispy and soft fritters made with urad dal, served with chutney and sambar",
      price: 100,
      image_url: ('/Medu Vada.png'),
      category: "South India",
      rating: 4.7
    },
    {
      id: 13,
      name: "Ghee Roast Dosa",
      description: "Golden crispy dosa roasted in ghee, South Indian breakfast classic",
      price: 130,
      image_url:('/Ghee Roast Dosa.png'),
      category: "South India",
      rating: 4.6
    },
    {
      id: 14,
      name: "Onion Uttapam",
      description: "Thick rice‑lentil pancake topped with onions, chilies and coriander",
      price: 140,
      image_url:('/Onion Uttapam.png'),
      category: "South India",
      rating: 4.5
    },
    {
      id: 15,
      name: "Pongal",
      description: "Comforting rice and moong dal dish seasoned with pepper, ginger and ghee",
      price: 120,
      image_url:('/Pongal.png'),
      category: "South India",
      rating: 4.4
    },
    {
      id: 16,
      name: "Rava Kesari",
      description: "Sweet semolina pudding flavored with saffron, ghee and nuts",
      price: 110,
      image_url:('/Rava Kesari.png'),
      category: "South India",
      rating: 4.6
    },
    {
      id: 17,
      name: "Coconut Chutney",
      description: "Fresh coconut chutney tempered with mustard seeds and curry leaves",
      price: 60,
      image_url:('/Coconut Chutney.png'),
      category: "South India",
      rating: 4.8
    },
    {
      id: 18,
      name: "Sambar Rice",
      description: "Rice cooked with lentils and vegetables in sambar gravy",
      price: 130,
      image_url:('/Sambar Rice.png'),
      category: "South India",
      rating: 4.5
    },
    {
      id: 19,
      name: "Lemon Rice",
      description: "Tangy rice tossed with lemon, peanuts and curry leaves",
      price: 120,
      image_url:('/Lemon Rice.png'),
      category: "South India",
      rating: 4.6
    },
    {
      id: 20,
      name: "Tamarind Rice (Pulihora)",
      description: "Pulihora–tamarind flavored rice tossed with peanuts and spices",
      price: 130,
      image_url: ('/Tamarind Rice (Pulihora).png'),
      category: "South India",
      rating: 4.7
    },

    // Rayalaseema Spices
    {
      id: 21,
      name: "Ragi Sangati with Natukodi Kura",
      description: "Finger millet rice balls served with country chicken curry",
      price: 280,
      image_url: ('/Ragi Sangati with Natukodi Kura.png'),
      category: "Rayalaseema Spices",
      rating: 4.5
    },
    {
      id: 22,
      name: "Miriyala Mamsam (Pepper Mutton)",
      description: "Dry pepper‑spiced mutton fry typical of Rayalaseema",
      price: 360,
      image_url:('/Miriyala Mamsam (Pepper Mutton).png'),
      category: "Rayalaseema Spices",
      rating: 4.6
    },
    {
      id: 23,
      name: "Seema Karam Dosa",
      description: "Spicy dosa topped with Rayalaseema chili powder and curry leaves",
      price: 90,
      image_url:('/Seema Karam Dosa.png'),
      category: "Rayalaseema Spices",
      rating: 4.4
    },
    {
      id: 24,
      name: "Ulli Karam Chicken",
      description: "Onion chili chicken fry from Rayalaseema region",
      price: 250,
      image_url:('/Ulli Karam Chicken.png'),
      category: "Rayalaseema Spices",
      rating: 4.5
    },
    {
      id: 25,
      name: "Paya Soup",
      description: "Spicy goat trotters soup, hearty Rayalaseema specialty",
      price: 180,
      image_url:('/Paya Soup.png'),
      category: "Rayalaseema Spices",
      rating: 4.3
    },
    {
      id: 26,
      name: "Natu Kodi Fry",
      description: "Country chicken pieces fried with spicy Rayalaseema masala",
      price: 300,
      image_url:('/Natu Kodi Fry.png'),
      category: "Rayalaseema Spices",
      rating: 4.6
    },
    {
      id: 27,
      name: "Kheema Balls (Mutton)",
      description: "Spicy Rayalaseema‑style mutton kheema balls",
      price: 230,
      image_url:('/Kheema Balls (Mutton).png'),
      category: "Rayalaseema Spices",
      rating: 4.4
    },
    {
      id: 28,
      name: "Rayalaseema Chicken Biryani",
      description: "Fiery biryani with Rayalaseema chili and country chicken",
      price: 300,
      image_url:('/Rayalaseema Chicken Biryani.png'),
      category: "Rayalaseema Spices",
      rating: 4.7
    },
    {
      id: 29,
      name: "Natu Kodi Rasam",
      description: "Pepper‑flavored country chicken rasam from Rayalaseema",
      price: 150,
      image_url:('/Natu Kodi Rasam.png'),
      category: "Rayalaseema Spices",
      rating: 4.5
    },
    {
      id: 30,
      name: "Karam Podi Idli",
      description: "Soft idlis drizzled with spicy garlic‑chili powder",
      price: 100,
      image_url:('/Karam Podi Idli.png'),
      category: "Rayalaseema Spices",
      rating: 4.6
    },

    // Fast Food
    {
      id: 31,
      name: "Veg Burger",
      description: "Crispy vegetable patty with lettuce, tomato and sauce",
      price: 120,
      image_url:('/Veg Burger.png'),
      category: "Fast Food",
      rating: 4.2
    },
    {
      id: 32,
      name: "Chicken Burger",
      description: "Juicy chicken patty burger with mayo and veggies",
      price: 140,
      image_url: ('/Chicken Burger.png'),
      category: "Fast Food",
      rating: 4.3
    },
    {
      id: 33,
      name: "Paneer Wrap",
      description: "Grilled paneer and veggies wrapped in soft tortilla",
      price: 130,
      image_url:('/Paneer Wrap.png'),
      category: "Fast Food",
      rating: 4.4
    },
    {
      id: 34,
      name: "Chicken Shawarma",
      description: "Middle‑eastern style grilled chicken wrap with garlic sauce",
      price: 150,
      image_url:('/Chicken Shawarma.png'),
      category: "Fast Food",
      rating: 4.5
    },
    {
      id: 35,
      name: "French Fries",
      description: "Crispy golden potato fries seasoned lightly",
      price: 80,
      image_url:('/French Fries.png'),
      category: "Fast Food",
      rating: 4.4
    },
    {
      id: 36,
      name: "Spring Rolls",
      description: "Vegetable spring rolls with sweet chili dip",
      price: 110,
      image_url:('/Spring Rolls.png'),
      category: "Fast Food",
      rating: 4.3
    },
    {
      id: 37,
      name: "Gobi Manchurian",
      description: "Crispy cauliflower tossed in fiery Indo‑Chinese sauce",
      price: 130,
      image_url:('/Gobi Manchurian.png'),
      category: "Fast Food",
      rating: 4.5
    },
    {
      id: 38,
      name: "Chilli Paneer",
      description: "Paneer cubes in spicy chili garlic sauce",
      price: 140,
      image_url:('/Chilli Paneer.png'),
      category: "Fast Food",
      rating: 4.4
    },
    {
      id: 39,
      name: "Chicken Nuggets",
      description: "Golden breaded chicken nuggets with dipping sauce",
      price: 120,
      image_url:('/Chicken Nuggets.png'),
      category: "Fast Food",
      rating: 4.3
    },
    {
      id: 40,
      name: "Cheese Sandwich",
      description: "Grilled cheese sandwich with butter and herbs",
      price: 100,
      image_url:('/Cheese Sandwich.png'),
      category: "Fast Food",
      rating: 4.2
    },

    // Sweets
    {
      id: 41,
      name: "Bobbatlu (Puran Poli)",
      description: "Sweet flatbread stuffed with lentil‑jaggery filling",
      price: 90,
      image_url:('/Bobbatlu (Obbattu  Puran Poli).png'),
      category: "Sweets",
      rating: 4.8
    },
    {
      id: 42,
      name: "Ariselu",
      description: "Crispy sweet rice cakes made with jaggery and rice flour",
      price: 80,
      image_url:('/Ariselu.png'),
      category: "Sweets",
      rating: 4.7
    },
    {
      id: 43,
      name: "Pootharekulu",
      description: "Paper‑thin sweet rolls with sugar and ghee coating",
      price: 100,
      image_url:('/Pootharekulu.png'),
      category: "Sweets",
      rating: 4.6
    },
    {
      id: 44,
      name: "Mysore Pak",
      description: "Ghee‑rich gram flour fudge, soft and melt‑in‑mouth",
      price: 90,
      image_url:('/Mysore Pak.png'),
      category: "Sweets",
      rating: 4.8
    },
    {
      id: 45,
      name: "Gulab Jamun",
      description: "Soft milk‑solid balls soaked in sugar syrup",
      price: 70,
      image_url:('/Gulab Jamun.png'),
      category: "Sweets",
      rating: 4.8
    },
    {
      id: 46,
      name: "Rasgulla",
      description: "Spongy cheese balls in light syrup",
      price: 70,
      image_url:('/Rasgulla.png'),
      category: "Sweets",
      rating: 4.7
    },
    {
      id: 47,
      name: "Double Ka Meetha",
      description: "Bread pudding sweetened with saffron, milk and nuts",
      price: 80,
      image_url:('/Double Ka Meetha.png'),
      category: "Sweets",
      rating: 4.6
    },
    {
      id: 48,
      name: "Payasam (Kheer)",
      description: "Rice pudding flavored with cardamom and nuts",
      price: 90,
      image_url:('/Payasam (Kheer).png'),
      category: "Sweets",
      rating: 4.7
    },
    {
      id: 49,
      name: "Kova Kajjikayalu",
      description: "Fried sweet dumplings filled with coconut‑milk kova",
      price: 100,
      image_url:('/Kova Kajjikayalu.png'),
      category: "Sweets",
      rating: 4.7
    },
    {
      id: 50,
      name: "Junnu (Milk Pudding)",
      description: "Smooth and sweet South Indian milk pudding often flavored with cardamom",
      price: 90,
      image_url:('/Junnu (Milk Pudding).png'),
      category: "Sweets",
      rating: 4.6
    },

    // Cool Drinks
    {
      id: 51,
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda, sweet or salted",
      price: 60,
      image_url:('/Fresh Lime Soda (SweetSalt).png'),
      category: "Cool Drinks",
      rating: 4.5
    },
    {
      id: 52,
      name: "Rose Milk",
      description: "Cold rose‑flavored milk drink",
      price: 70,
      image_url:('/Rose Milk.png'),
      category: "Cool Drinks",
      rating: 4.5
    },
    {
      id: 53,
      name: "Buttermilk (Majjiga)",
      description: "Spiced cooling buttermilk",
      price: 50,
      image_url:('/Buttermilk (Majjiga).png'),
      category: "Cool Drinks",
      rating: 4.4
    },
    {
      id: 54,
      name: "Lassi (Sweet/Salt)",
      description: "Creamy yogurt‑based drink, sweet or salted",
      price: 70,
      image_url:('/Lassi recipe, Sweet lassi recipe.png'),
      category: "Cool Drinks",
      rating: 4.6
    },
    {
      id: 55,
      name: "Masala Soda",
      description: "Carbonated drink with masala seasoning",
      price: 60,
      image_url:('/Masala Soda.png'),
      category: "Cool Drinks",
      rating: 4.4
    },
    {
      id: 56,
      name: "Mango Juice",
      description: "Fresh mango juice",
      price: 80,
      image_url:('/Mango Juice.png'),
      category: "Cool Drinks",
      rating: 4.8
    },
    {
      id: 57,
      name: "Watermelon Juice",
      description: "Pure watermelon juice",
      price: 80,
      image_url:('/Watermelon Juice.png'),
      category: "Cool Drinks",
      rating: 4.7
    },
    {
      id: 58,
      name: "Coke / Pepsi / Sprite",
      description: "Cold soft drinks",
      price: 60,
      image_url:('/Coke  Pepsi  Sprite.png'),
      category: "Cool Drinks",
      rating: 4.3
    },
    {
      id: 59,
      name: "Tender Coconut Water",
      description: "Natural fresh tender coconut water",
      price: 70,
      image_url:('/Tender Coconut Water.png'),
      category: "Cool Drinks",
      rating: 4.9
    },
    {
      id: 60,
      name: "Falooda",
      description: "Sweet falooda dessert drink with vermicelli and ice cream",
      price: 90,
      image_url:('/Falooda.png'),
      category: "Cool Drinks",
      rating: 4.8
    },
    {
      id: 61,
      name: "Normal Water Bottle",
      description: "Pure drinking water bottle(1000ml)",
      price: 25,
      image_url: ('/Normal Drinking Water.png'),
      category: "Water",
      rating: 4.8
    },
    {
      id: 62,
      name: "Cool Water Bottle",
      description: "Pure drinking Cool water bottle(1000ml)",
      price: 30,
      image_url: ('/Cool Drinking Water.png'),
      category: "Water",
      rating: 4.8
    }
  ];

  const categories = ['All', 'Andhra Specials', 'South India', 'Rayalaseema Spices', 'Fast Food', 'Sweets', 'Cool Drinks', 'Water'];

  useEffect(() => {
    setMenuItems(sampleMenuItems);
    setFilteredItems(sampleMenuItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = menuItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, menuItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully crafted dishes made with the finest ingredients and authentic recipes.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}