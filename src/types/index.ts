export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  position: string;
  bio?: string;
  university?: string;
  batch?: string;
  clubs: string[];
  roles: ('admin' | 'community_admin' | 'member')[];
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  type: 'university' | 'club' | 'batch';
  slug: string;
  active: boolean;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  history: string;
  officialInfo: {
    contacts: string[];
    links: string[];
  };
  members: string[];
  admins: string[];
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  authorPosition: string;
  body: string;
  images: string[];
  videoUrl?: string;
  tagId: string;
  tagName: string;
  visibility: 'public_to_members';
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Event extends Omit<Post, 'body'> {
  title: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  requiredSlots: number;
  approvedParticipants: string[];
  pendingRequests: string[];
  status: 'open' | 'full' | 'closed';
  allowWaitlist: boolean;
  isParticipant: boolean;
  isPending: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  parentType: 'post' | 'event';
  parentId: string;
  body: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'event_request' | 'event_approved' | 'comment' | 'mention' | 'announcement';
  data: any;
  readAt?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: 'info' | 'warning' | 'critical';
  activeFrom: string;
  activeTo: string;
  createdBy: string;
}
