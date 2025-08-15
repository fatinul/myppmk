-- This schema is based on the detailed entity definitions in README.md

-- Developer 1: Core Infrastructure & User Management

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP,
    password_hash VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    position VARCHAR(255) NOT NULL, -- This is a required field as per README
    bio TEXT,
    university VARCHAR(255),
    batch VARCHAR(255),
    role ENUM('MEMBER', 'ADMIN', 'COMMUNITY_ADMIN') NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type ENUM('UNIVERSITY', 'CLUB', 'BATCH') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Developer 2: Posts, Comments & Favourites

CREATE TABLE posts (
    id VARCHAR(255) PRIMARY KEY,
    author_user_id VARCHAR(255), -- Author can be a user
    author_community_id VARCHAR(255), -- Or a community
    body TEXT NOT NULL,
    video_url VARCHAR(255),
    tag_id VARCHAR(255) NOT NULL, -- Required
    visibility ENUM('PUBLIC_TO_MEMBERS') NOT NULL DEFAULT 'PUBLIC_TO_MEMBERS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (author_community_id) REFERENCES communities(id) ON DELETE SET NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT chk_author CHECK (author_user_id IS NOT NULL OR author_community_id IS NOT NULL)
);

CREATE TABLE post_images (
    id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id VARCHAR(255) PRIMARY KEY,
    author_id VARCHAR(255) NOT NULL,
    parent_type ENUM('POST', 'EVENT') NOT NULL,
    parent_id VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favourites (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    parent_type ENUM('POST', 'EVENT') NOT NULL,
    parent_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, parent_type, parent_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Developer 3: Events & Notifications

CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    creator_user_id VARCHAR(255), -- Creator can be a user
    creator_community_id VARCHAR(255), -- Or a community
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    required_slots INT NOT NULL,
    status ENUM('OPEN', 'FULL', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    allow_waitlist BOOLEAN DEFAULT FALSE,
    tag_id VARCHAR(255) NOT NULL, -- Required
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (creator_community_id) REFERENCES communities(id) ON DELETE SET NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE RESTRICT,
    CONSTRAINT chk_creator CHECK (creator_user_id IS NOT NULL OR creator_community_id IS NOT NULL)
);

CREATE TABLE event_images (
    id VARCHAR(255) PRIMARY KEY,
    event_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE event_participants (
    user_id VARCHAR(255) NOT NULL,
    event_id VARCHAR(255) NOT NULL,
    status ENUM('APPROVED', 'PENDING', 'WAITLISTED', 'DECLINED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('EVENT_REQUEST', 'EVENT_APPROVED', 'COMMENT', 'MENTION', 'ANNOUNCEMENT') NOT NULL,
    data JSON,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Developer 4: Communities & PPMK Page

CREATE TABLE communities (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(255),
    cover_image_url VARCHAR(255),
    description TEXT,
    history TEXT, -- Rich text
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE community_members (
    user_id VARCHAR(255) NOT NULL,
    community_id VARCHAR(255) NOT NULL,
    role ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, community_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
);

CREATE TABLE community_contact_links (
    id VARCHAR(255) PRIMARY KEY,
    community_id VARCHAR(255) NOT NULL,
    type ENUM('EMAIL', 'PHONE', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'TIKTOK', 'OTHER') NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
);

-- Developer 5: Announcements & Search

CREATE TABLE announcements (
    id VARCHAR(255) PRIMARY KEY,
    created_by_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    priority ENUM('INFO', 'WARNING', 'CRITICAL') NOT NULL DEFAULT 'INFO',
    active_from TIMESTAMP NOT NULL,
    active_to TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Direct Messaging System (Developer 5)
-- These tables provide the foundation for 1:1 and group chats.

CREATE TABLE chats (
    id VARCHAR(255) PRIMARY KEY,
    -- is_group_chat helps differentiate between 1:1 and group DMs.
    is_group_chat BOOLEAN NOT NULL DEFAULT FALSE,
    -- For group chats, you can add a name and an image.
    name VARCHAR(255),
    group_chat_image_url VARCHAR(255),
    created_by_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES users(id)
);

CREATE TABLE chat_participants (
    user_id VARCHAR(255) NOT NULL,
    chat_id VARCHAR(255) NOT NULL,
    -- You can add roles like 'admin' for group chats.
    role ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id VARCHAR(255) PRIMARY KEY,
    chat_id VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    -- You can add support for images, files, or reactions later.
    -- image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- An index on chat_id and created_at is crucial for fetching messages efficiently.
    INDEX idx_chat_created (chat_id, created_at DESC),
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- This table is essential for showing "seen" status and unread counts.
CREATE TABLE message_read_receipts (
    user_id VARCHAR(255) NOT NULL,
    chat_id VARCHAR(255) NOT NULL,
    last_read_message_id VARCHAR(255) NOT NULL,
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (last_read_message_id) REFERENCES messages(id) ON DELETE CASCADE
);