import React, { useState } from 'react';
import { Users, MapPin, Calendar, ExternalLink, Mail, Phone } from 'lucide-react';
import { Community } from '../../types';

// Mock communities data
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'PPMK University of Malaya',
    slug: 'ppmk-um',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=300&fit=crop',
    description: 'The official Korean Student Club at University of Malaya, promoting Korean culture and fostering friendships.',
    history: 'Founded in 2018, PPMK UM has grown to become one of the most active Korean cultural clubs in Malaysia. We organize regular cultural events, language exchanges, and social gatherings.',
    officialInfo: {
      contacts: ['ppmk.um@gmail.com', '+60 12-345-6789'],
      links: ['https://instagram.com/ppmk_um', 'https://facebook.com/ppmkum']
    },
    members: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    admins: ['1', '2'],
    createdAt: '2018-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'PPMK Universiti Putra Malaysia',
    slug: 'ppmk-upm',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop',
    description: 'UPM\'s premier Korean cultural organization, dedicated to sharing Korean traditions and building community.',
    history: 'Established in 2019, PPMK UPM has quickly become a vibrant community for Korean culture enthusiasts at UPM.',
    officialInfo: {
      contacts: ['ppmk.upm@gmail.com', '+60 12-987-6543'],
      links: ['https://instagram.com/ppmk_upm']
    },
    members: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    admins: ['3', '4'],
    createdAt: '2019-02-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Korean Dance Society',
    slug: 'korean-dance',
    logo: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=300&fit=crop',
    description: 'Passionate dancers bringing Korean choreography to life through K-Pop and traditional dance.',
    history: 'Started as a small group of K-Pop enthusiasts in 2020, we now perform at major university events and competitions.',
    officialInfo: {
      contacts: ['koreandance@gmail.com'],
      links: ['https://youtube.com/koreandancemalaysia', 'https://tiktok.com/@koreandancemy']
    },
    members: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    admins: ['5', '6'],
    createdAt: '2020-06-10T00:00:00Z'
  }
];

const CommunityPage: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'members' | 'posts' | 'events'>('info');

  if (selectedCommunity) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedCommunity(null)}
          className="mb-6 text-gold-600 hover:text-gold-700 font-medium"
        >
          ← Back to Communities
        </button>

        {/* Community Header */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="relative">
            <img
              src={selectedCommunity.coverImage}
              alt={selectedCommunity.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-end gap-4">
              <img
                src={selectedCommunity.logo}
                alt={selectedCommunity.name}
                className="w-20 h-20 rounded-lg border-4 border-white object-cover"
              />
              <div className="text-white">
                <h1 className="text-2xl font-bold">{selectedCommunity.name}</h1>
                <p className="text-white/90">{selectedCommunity.members.length} members</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-4">{selectedCommunity.description}</p>
            
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
              {['info', 'members', 'posts', 'events'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 px-1 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-gold-600 border-b-2 border-gold-400'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700">{selectedCommunity.history}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {selectedCommunity.officialInfo.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {contact.includes('@') ? (
                        <Mail className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Phone className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-gray-700">{contact}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
                <div className="space-y-2">
                  {selectedCommunity.officialInfo.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-600 hover:text-gold-700"
                      >
                        {link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Members ({selectedCommunity.members.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCommunity.members.slice(0, 12).map((memberId, index) => (
                  <div key={memberId} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=50&h=50&fit=crop&crop=face`}
                      alt="Member"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Member {index + 1}</p>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Community posts will appear here</p>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Community events will appear here</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Directory</h1>
        <p className="text-gray-600">Discover and connect with PPMK communities across Malaysia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCommunity(community)}
          >
            <div className="relative">
              <img
                src={community.coverImage}
                alt={community.name}
                className="w-full h-32 object-cover"
              />
              <img
                src={community.logo}
                alt={community.name}
                className="absolute -bottom-6 left-4 w-12 h-12 rounded-lg border-2 border-white object-cover"
              />
            </div>
            
            <div className="p-4 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{community.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{community.members.length} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {new Date(community.createdAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
