import { useState } from 'react';
import { User, Mail, Phone, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface Order {
  id: number;
  date: string;
  total: number;
  status: 'completed' | 'preparing' | 'delivered';
  items: string[];
}

interface UserProfile {
  email?: string;
  phone?: string;
  address?: string;
  memberSince?: string;
}

interface ProfileProps {
  user: UserProfile;
  setCurrentPage: (page: string) => void;
}

export default function Profile({ user, setCurrentPage }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>({
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    memberSince: user.memberSince || 'January 2024'
  });

  const sampleOrders: Order[] = [
    {
      id: 1,
      date: '2024-01-15',
      total: 680,
      status: 'delivered',
      items: ['Gongura Pachadi', 'Hyderabadi Veg Biryani']
    },
    {
      id: 2,
      date: '2024-01-12',
      total: 420,
      status: 'completed',
      items: ['Bobbatlu', 'Panakam', 'Ariselu']
    },
    {
      id: 3,
      date: '2024-01-10',
      total: 340,
      status: 'preparing',
      items: ['Pesarattu', 'Buttermilk']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = () => {
    // Simulate saving data
    console.log('Updated user:', editedUser);
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Profile Info
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'orders'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Order History
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
              <p className="text-gray-600">Manage your account information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  {editMode ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="text-gray-600 border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="text-gray-600">{editedUser.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedUser.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="text-gray-600 border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="text-gray-600">{editedUser.phone || '(555) 123-4567'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedUser.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="text-gray-600 border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p className="text-gray-600">{editedUser.address || '123 Main St, City, State 12345'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Member Since</p>
                  <p className="text-gray-600">{editedUser.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t space-x-3">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-gray-600 hover:text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          {sampleOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-amber-600">₹{order.total}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Items:</p>
                <p className="text-gray-600">{order.items.join(', ')}</p>
              </div>
            </div>
          ))}
          {sampleOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found. Start by browsing our menu!</p>
              <button
                onClick={() => setCurrentPage('menu')}
                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
