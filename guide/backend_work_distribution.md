# Backend Work Distribution (5 Developers)

This document outlines the backend development tasks, distributed among five developers, based on the project standards defined in the `README.md`.

---

## Developer 1: Core Infrastructure & User Management

**Focus:** Foundational systems, user identity, and high-level admin controls. This developer sets the stage for others.

**Key Features:**
- User Authentication & Profile (2.1, 3.1)
- Admin Console (User & Tag Management) (5)

**Tasks:**
1.  **Initial Setup:** Configure the core backend framework, database connection, and CI/CD pipeline.
2.  **User Authentication:**
    - Implement email/password login and a secure password-hashing mechanism.
    - Set up the user authentication flow, including JWT generation and validation.
    - Implement the signup whitelist (domain-based) and/or admin invite system. (Optional)
    - Enforce mandatory profile completion upon first login.
3.  **User & Role Management:**
    - Create CRUD endpoints for user profiles (`/users/{id}`).
    - Implement the API for the **Admin Console** to manage users (activate/deactivate, assign `position`, promote to `Community Admin`).
4.  **Tag Management:**
    - Create CRUD endpoints for the **Admin Console** to manage `Tags` (name, type, slug).
    - Ensure that posts and events can be associated with a tag.

---

## Developer 2: Posts, Comments & Favourites

**Focus:** The complete lifecycle of posts and user interactions with them.

**Key Features:**
- Posts (4.1)
- Comments (3.6)
- Favourites (4.9)

**Tasks:**
1.  **Post Management:**
    - Create full CRUD endpoints for `Posts`.
    - Enforce the rule that every post must have exactly one `tagId`.
    - Handle image uploads and association with posts.
2.  **Comment System:**
    - Create CRUD endpoints for `Comments`.
    - Ensure comments can be associated with both `Posts` and `Events` (`parentType`, `parentId`).
3.  **Favourites System:**
    - Implement endpoints for a user to save or unsave a `Post` or `Event`.
    - Create an endpoint to retrieve a user's favourites, with support for filtering by `type` and `tag`.

---

## Developer 3: Events & Notifications

**Focus:** The unique event creation and participation workflow, plus the notification system.

**Key Features:**
- Events (4.2)
- Notifications (4.10)

**Tasks:**
1.  **Event Management:**
    - Create full CRUD endpoints for `Events`.
    - Implement the core event logic: `requiredSlots`, `approvedParticipants`, `pendingRequests`.
    - Develop the state machine for event status (`open` -> `full` -> `closed`).
    - Implement the optional `allowWaitlist` functionality.
2.  **Event Participation Workflow:**
    - Create endpoints for members to `Request to Join` an event.
    - Create endpoints for the event creator to `Approve` or `Decline` pending requests.
3.  **Notification System:**
    - Design and implement the `Notifications` system.
    - Create triggers for all specified notification types (event requests/approvals, comments, mentions, announcements).
    - Implement an endpoint to fetch a user's notifications and mark them as read.

---

## Developer 4: Communities & PPMK Page

**Focus:** The systems that allow for sub-groups and official content within the platform.

**Key Features:**
- Community Pages (4.7)
- PPMK Page (4.6)
- Admin Console (Community Management) (5)

**Tasks:**
1.  **Community Management:**
    - Create CRUD endpoints for `Communities`.
    - Implement endpoints for the **Admin Console** to approve new communities and assign `Community Admins`.
2.  **Community Pages:**
    - Develop endpoints to fetch all data needed for an official community page (info, members, posts, events).
    - Implement membership management (users joining/leaving a community).
    - Ensure `Community Admins` have the correct permissions to manage their page and members.
3.  **PPMK Page:**
    - Create endpoints to specifically fetch content created by `Admin` or designated PPMK accounts.
    - This will likely involve filtering existing `Post` and `Event` endpoints by `authorId`.
---

## Developer 5: Search, Announcements & Messaging

**Focus:** Global, cross-cutting features that enhance the user experience.

**Key Features:**
- Global Search (4.4, 7)
- Announcements (3.8, 4.5)
- Direct Messages (4.11)

**Tasks:**
1.  **Global Search Engine:**
    - Design and implement the search API.
    - Implement the search parser to handle the GitHub-style syntax (`tag:`, `type:`, `author:`, booleans, etc.). (Optional but highly recommended)
    - Ensure search queries can return a mix of `Posts`, `Events`, `Users`, and `Communities`.
2.  **Announcements System:**
    - Create CRUD endpoints for `Announcements`.
    - Implement scheduling (`activeFrom`, `activeTo`) and priority levels.
    - Create an endpoint to fetch active announcements for the home page widget.
3.  **Direct Messaging (DMs):**
    - Design the schema and implement the backend for 1:1 and small group chats.
    - Implement real-time message delivery (likely using WebSockets).
    - Provide endpoints for creating chats, sending messages, and fetching chat history.
