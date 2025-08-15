import React from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Users, 
  Building2, 
  ShoppingBag,
  User,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost: () => void;
  onCreateEvent: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onCreatePost, onCreateEvent }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'favourites', label: 'Favourites', icon: Heart },
    { id: 'ppmk', label: 'PPMK Page', icon: Building2 },
    { id: 'community', label: 'Community Page', icon: Users },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gold-400 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">MyPPMK</h1>
          <p className="text-sm text-gray-500">Korean Student Club</p>
        </div>
      </div>

      {/* Create Buttons */}
      <div className="space-y-2 mb-6">
        <button
          onClick={onCreatePost}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gold-400 text-white rounded-lg hover:bg-gold-500 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Post
        </button>
        <button
          onClick={onCreateEvent}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gold-100 text-gold-700 rounded-lg hover:bg-gold-200 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          New Event
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gold-50 text-gold-700 border-r-2 border-gold-400'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
