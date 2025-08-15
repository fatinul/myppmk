import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave, onComment }) => {
  const [showComments, setShowComments] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{post.authorPosition}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
            {post.tagName}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 whitespace-pre-wrap">{post.body}</p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="px-4 pb-4">
          <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Video */}
      {post.videoUrl && (
        <div className="px-4 pb-4">
          <video
            src={post.videoUrl}
            controls
            className="w-full h-64 rounded-lg"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-2 ${
                post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.likeCount}</span>
            </button>
            
            <button
              onClick={() => {
                setShowComments(!showComments);
                onComment(post.id);
              }}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-500"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.commentCount}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
              <Share className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => onSave(post.id)}
            className={`p-2 rounded-full ${
              post.isSaved ? 'text-gold-500' : 'text-gray-500 hover:text-gold-500'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
