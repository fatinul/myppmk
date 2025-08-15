-- Supabase/PostgreSQL Compatible Schema
-- This schema is corrected for PostgreSQL syntax and includes best practices for Supabase.

-- Enable the UUID extension if it's not already enabled.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create a trigger function to automatically update `updated_at` columns.
CREATE OR REPLACE FUNCTION handle_updated_at() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Define all ENUM types first.
CREATE TYPE user_role AS ENUM ('MEMBER', 'ADMIN', 'COMMUNITY_ADMIN');
CREATE TYPE tag_type AS ENUM ('UNIVERSITY', 'CLUB', 'BATCH');
CREATE TYPE post_visibility AS ENUM ('PUBLIC_TO_MEMBERS');
CREATE TYPE parent_type AS ENUM ('POST', 'EVENT');
CREATE TYPE event_status AS ENUM ('OPEN', 'FULL', 'CLOSED');
CREATE TYPE participant_status AS ENUM ('APPROVED', 'PENDING', 'WAITLISTED', 'DECLINED');
CREATE TYPE notification_type AS ENUM ('EVENT_REQUEST', 'EVENT_APPROVED', 'COMMENT', 'MENTION', 'ANNOUNCEMENT');
CREATE TYPE community_member_role AS ENUM ('MEMBER', 'ADMIN');
CREATE TYPE contact_link_type AS ENUM ('EMAIL', 'PHONE', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'TIKTOK', 'OTHER');
CREATE TYPE announcement_priority AS ENUM ('INFO', 'WARNING', 'CRITICAL');
CREATE TYPE chat_member_role AS ENUM ('MEMBER', 'ADMIN');

-- 3. Create Tables

-- Users & Tags
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    email_verified_at TIMESTAMPTZ,
    password_hash TEXT NOT NULL,
    image_url TEXT,
    position TEXT NOT NULL,
    bio TEXT,
    university TEXT,
    batch TEXT,
    role user_role NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type tag_type NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Communities
CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    cover_image_url TEXT,
    description TEXT,
    history TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_user_id UUID,
    author_community_id UUID,
    body TEXT NOT NULL,
    video_url TEXT,
    tag_id UUID NOT NULL,
    visibility post_visibility NOT NULL DEFAULT 'PUBLIC_TO_MEMBERS',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (author_community_id) REFERENCES communities(id) ON DELETE SET NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT chk_author CHECK (author_user_id IS NOT NULL OR author_community_id IS NOT NULL)
);

CREATE TABLE post_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Events
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_user_id UUID,
    creator_community_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    required_slots INT NOT NULL,
    status event_status NOT NULL DEFAULT 'OPEN',
    allow_waitlist BOOLEAN DEFAULT FALSE,
    tag_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (creator_user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (creator_community_id) REFERENCES communities(id) ON DELETE SET NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT chk_creator CHECK (creator_user_id IS NOT NULL OR creator_community_id IS NOT NULL)
);

CREATE TABLE event_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE event_participants (
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    status participant_status NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Interactions (Comments, Favourites)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL,
    parent_type parent_type NOT NULL,
    parent_id UUID NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favourites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    parent_type parent_type NOT NULL,
    parent_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, parent_type, parent_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications & Announcements
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    type notification_type NOT NULL,
    data JSONB,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by_id UUID NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    priority announcement_priority NOT NULL DEFAULT 'INFO',
    active_from TIMESTAMPTZ NOT NULL,
    active_to TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Community Relations
CREATE TABLE community_members (
    user_id UUID NOT NULL,
    community_id UUID NOT NULL,
    role community_member_role NOT NULL DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, community_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
);

CREATE TABLE community_contact_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL,
    type contact_link_type NOT NULL,
    value TEXT NOT NULL,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
);

-- Direct Messaging
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_group_chat BOOLEAN NOT NULL DEFAULT FALSE,
    name TEXT,
    group_chat_image_url TEXT,
    created_by_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (created_by_id) REFERENCES users(id)
);

CREATE TABLE chat_participants (
    user_id UUID NOT NULL,
    chat_id UUID NOT NULL,
    role chat_member_role NOT NULL DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL,
    author_id UUID NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE message_read_receipts (
    user_id UUID NOT NULL,
    chat_id UUID NOT NULL,
    last_read_message_id UUID NOT NULL,
    last_read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (last_read_message_id) REFERENCES messages(id) ON DELETE CASCADE
);

-- 4. Create Indexes for Foreign Keys and Queries
CREATE INDEX ON posts (author_user_id);
CREATE INDEX ON posts (author_community_id);
CREATE INDEX ON posts (tag_id);
CREATE INDEX ON events (creator_user_id);
CREATE INDEX ON events (creator_community_id);
CREATE INDEX ON events (tag_id);
CREATE INDEX ON comments (author_id);
CREATE INDEX ON comments (parent_type, parent_id);
CREATE INDEX ON favourites (user_id);
CREATE INDEX ON notifications (user_id);
CREATE INDEX ON announcements (created_by_id);
CREATE INDEX ON community_members (community_id);
CREATE INDEX ON messages (chat_id, created_at DESC);

-- 5. Create Triggers to call the updated_at function
CREATE TRIGGER handle_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_communities_updated_at BEFORE UPDATE ON communities FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
