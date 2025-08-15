import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onJoinRequest: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoinRequest }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = () => {
    switch (event.status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'full':
        return 'bg-red-100 text-red-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getButtonText = () => {
    if (event.isParticipant) return 'Joined';
    if (event.isPending) return 'Pending';
    if (event.status === 'full') return 'Full';
    if (event.status === 'closed') return 'Closed';
    return 'Request to Join';
  };

  const isButtonDisabled = () => {
    return event.isParticipant || event.status === 'closed' || (event.status === 'full' && !event.allowWaitlist);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={event.authorImage}
            alt={event.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{event.authorName}</h3>
            <p className="text-sm text-gray-500">{event.authorPosition}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
            {event.tagName}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor()}`}>
            {event.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Event Image */}
      {event.images.length > 0 && (
        <div className="px-4">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5" />
            <div>
              <p className="font-medium">Start: {formatDate(event.startAt)}</p>
              <p className="text-sm">End: {formatDate(event.endAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5" />
            <span>
              {event.approvedParticipants.length} / {event.requiredSlots} participants
              {event.pendingRequests.length > 0 && (
                <span className="text-gold-600 ml-2">
                  ({event.pendingRequests.length} pending)
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gold-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((event.approvedParticipants.length / event.requiredSlots) * 100, 100)}%`
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => !isButtonDisabled() && onJoinRequest(event.id)}
          disabled={isButtonDisabled()}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            event.isParticipant
              ? 'bg-green-100 text-green-700'
              : event.isPending
              ? 'bg-yellow-100 text-yellow-700'
              : isButtonDisabled()
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-gold-400 text-white hover:bg-gold-500'
          }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
