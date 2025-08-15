import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import HomePage from './components/Home/HomePage';
import CommunityPage from './components/Community/CommunityPage';
import MarketplacePage from './components/Marketplace/MarketplacePage';
import { Building2 } from 'lucide-react';

// Login Component
const LoginPage: React.FC<{ onLogin: (email: string, password: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to MyPPMK</h1>
          <p className="text-gray-600 mt-2">Malaysia Korean Student Club Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="your.email@student.edu.my"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold-400 text-white py-2 px-4 rounded-lg hover:bg-gold-500 transition-colors font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-gold-600 hover:text-gold-700 font-medium">
              Request Access
            </button>
          </p>
        </div>

        <div className="mt-8 p-4 bg-gold-50 rounded-lg">
          <p className="text-sm text-gold-800 font-medium mb-2">Demo Access:</p>
          <p className="text-xs text-gold-700">
            Use any email and password to access the demo platform
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { user, loading, login } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gold-400 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading MyPPMK...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'community':
        return <CommunityPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'search':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Advanced search functionality coming soon</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Notifications will appear here</p>
          </div>
        );
      case 'events':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Events page coming soon</p>
          </div>
        );
      case 'messages':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Messages functionality coming soon</p>
          </div>
        );
      case 'favourites':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Your saved posts and events will appear here</p>
          </div>
        );
      case 'ppmk':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">PPMK official page coming soon</p>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Profile page coming soon</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreatePost={() => setShowCreatePost(true)}
        onCreateEvent={() => setShowCreateEvent(true)}
      />
      
      <TopBar currentPage={activeTab} />
      
      <main className="ml-64 pt-16 p-6">
        {renderContent()}
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
            <p className="text-gray-600 mb-4">Post creation functionality coming soon!</p>
            <button
              onClick={() => setShowCreatePost(false)}
              className="px-4 py-2 bg-gold-400 text-white rounded-lg hover:bg-gold-500"
            >
              Tutups
            </button>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            <p className="text-gray-600 mb-4">Event creation functionality coming soon!</p>
            <button
              onClick={() => setShowCreateEvent(false)}
              className="px-4 py-2 bg-gold-400 text-white rounded-lg hover:bg-gold-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
