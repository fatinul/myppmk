import React, { useState } from 'react';
import PostCard from '../Posts/PostCard';
import EventCard from '../Events/EventCard';
import { Post, Event, Announcement } from '../../types';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    authorName: 'Lee Min Ho',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    authorPosition: 'Vice President, PPMK UM',
    body: 'Just finished our Korean language workshop! 🇰🇷 Amazing turnout from students across different universities. The energy was incredible and everyone was so eager to learn. Special thanks to our native Korean speakers who volunteered as tutors today!',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop'],
    tagId: '1',
    tagName: 'UM',
    visibility: 'public_to_members',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    likeCount: 24,
    commentCount: 8,
    isLiked: false,
    isSaved: false
  },
  {
    id: '2',
    authorId: '2',
    authorName: 'Park Ji Sung',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    authorPosition: 'Cultural Director, PPMK UPM',
    body: 'Korean BBQ night was a huge success! 🥩🔥 We had over 50 members join us for an evening of delicious food and great conversations. Nothing brings people together like good food and shared experiences. Already planning the next one!',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop'
    ],
    tagId: '2',
    tagName: 'UPM',
    visibility: 'public_to_members',
    createdAt: '2024-01-14T18:45:00Z',
    updatedAt: '2024-01-14T18:45:00Z',
    likeCount: 42,
    commentCount: 15,
    isLiked: true,
    isSaved: true
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    authorId: '3',
    authorName: 'Kim So Hyun',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    authorPosition: 'Event Coordinator, PPMK',
    title: 'K-Pop Dance Workshop',
    description: 'Learn the latest K-Pop choreography from professional instructors! We\'ll be covering dances from popular groups like BTS, BLACKPINK, and NewJeans. All skill levels welcome!',
    location: 'PPMK Dance Studio, KL',
    startAt: '2024-01-20T14:00:00Z',
    endAt: '2024-01-20T17:00:00Z',
    requiredSlots: 30,
    approvedParticipants: ['1', '2', '3', '4', '5', '6', '7', '8'],
    pendingRequests: ['9', '10', '11'],
    tagId: '3',
    tagName: 'Dance Club',
    visibility: 'public_to_members',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
    likeCount: 18,
    commentCount: 5,
    isLiked: false,
    isSaved: false,
    images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop'],
    status: 'open',
    allowWaitlist: true,
    isParticipant: false,
    isPending: false
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'PPMK Annual General Meeting',
    body: 'Join us for our AGM on January 25th. Important decisions about club activities and leadership will be discussed.',
    priority: 'critical',
    activeFrom: '2024-01-15T00:00:00Z',
    activeTo: '2024-01-25T23:59:59Z',
    createdBy: 'PPMK Admin'
  },
  {
    id: '2',
    title: 'New Semester Registration',
    body: 'Registration for new semester activities is now open. Don\'t miss out on exciting events and workshops!',
    priority: 'info',
    activeFrom: '2024-01-10T00:00:00Z',
    activeTo: '2024-01-30T23:59:59Z',
    createdBy: 'PPMK Admin'
  }
];

const HomePage: React.FC = () => {
  const [posts] = useState<Post[]>(mockPosts);
  const [events] = useState<Event[]>(mockEvents);
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const [filter, setFilter] = useState<'all' | 'posts' | 'events'>('all');

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
  };

  const handleSave = (postId: string) => {
    console.log('Save post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleJoinEvent = (eventId: string) => {
    console.log('Join event:', eventId);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const filteredContent = () => {
    const allContent = [
      ...posts.map(post => ({ ...post, type: 'post' as const })),
      ...events.map(event => ({ ...event, type: 'event' as const }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filter === 'posts') return allContent.filter(item => item.type === 'post');
    if (filter === 'events') return allContent.filter(item => item.type === 'event');
    return allContent;
  };

  return (
    <div className="flex gap-6">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gold-400 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('posts')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'posts'
                  ? 'bg-gold-400 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setFilter('events')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'events'
                  ? 'bg-gold-400 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {/* Content Feed */}
        <div className="space-y-6">
          {filteredContent().map((item) => (
            <div key={item.id}>
              {item.type === 'post' ? (
                <PostCard
                  post={item as Post}
                  onLike={handleLike}
                  onSave={handleSave}
                  onComment={handleComment}
                />
              ) : (
                <EventCard
                  event={item as Event}
                  onJoinRequest={handleJoinEvent}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-3 rounded-lg border ${getPriorityColor(announcement.priority)}`}
              >
                <div className="flex items-start gap-3">
                  {getPriorityIcon(announcement.priority)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {announcement.title}
                    </h4>
                    <p className="text-sm text-gray-600">{announcement.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default HomePage;
