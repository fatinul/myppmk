# MyPPMK — Social Platform for Malaysia Korean Student Organization (PPMK)

Accent color: #EFBF04 (Gold)

## 0) Summary

Create a responsive, modern social web app called MyPPMK for the Malaysia Korean Student Club (PPMK). The platform is private to PPMK members and club organizers. It’s inspired by Instagram/Twitter (layout, feeds, posts) and GitHub Search (advanced search syntax). Core twist: users and clubs can post Events that specify required headcount; event creators can approve/decline join requests.

No “follow” feature (community over popularity). All posts require an admin-managed tag (university, club, or batch). Dedicated PPMK Page shows admin/PPMK posts. Community Page lists all registered clubs with their own official pages. Marketplace is a “Coming Soon” placeholder. Site-wide top search bar supports tag filters.

Target audience uses Malay/English/Korean; timezone defaults to Asia/Kuala_Lumpur.

## 1) Roles & Access

**Admin (PPMK HQ)**: manage members, roles/positions, communities, tags, announcements, site-wide settings, post moderation.

**Community Admin (Club Leads)**: manage club info page, approve club members, post on behalf of club, create events for club.

**Member (PPMK verified)**: create posts/events, request to join events, comment, react, save to Favourites, message.

**Guest:** no access (must log in).

**Authentication:** email login + optional SSO. Restrict signups to whitelisted domains (e.g., university emails) or admin invite. Force profile completion (name, image, position required).

## 2) Global Navigation (desktop left/side nav, bottom tab on mobile)

- Home
- Notifications
- Events
- Messages
- Favourites
- PPMK Page
- Community Page
- Marketplace (Coming Soon)
- User (Profile & Settings)
- Create buttons: New Post, New Event (modal)
- User avatar menu

## 3) Core Entities (Data Model Sketch)

**User:** id, name, email (verified), imageUrl, position (string; required), bio, university, batch, clubs[], roles [admin|community_admin|member], createdAt

**Tag (admin-managed):** id, name, type [university|club|batch], slug, active

**Community (Club)**: id, name, slug, logo, coverImage, description, history (rich text), official info (contacts, links), members[], admins[], createdAt

**Post:** id, authorId (user or community), body (text), images[], videoUrl?, tagId (required), visibility [public_to_members], createdAt, updatedAt, likeCount, commentCount

**Event (extends Post-like):** id, creatorId (user or community), title, description, location, startAt, endAt, requiredSlots (int), approvedParticipants[] (userIds), pendingRequests[] (userIds), tagId (required), images[], status [open|full|closed], allowWaitlist (bool)

**Comment:** id, authorId, parentType [post|event], parentId, body, createdAt

**Favourite:** id, userId, parentType [post|event], parentId, createdAt

**Notification:** id, userId, type [event_request|event_approved|comment|mention|announcement], data (json), readAt?

**Announcement:** id, title, body, priority [info|warning|critical], activeFrom, activeTo, createdBy

## 4) Key Features & UX Details
#### 4.1 Posts

- Create text + media posts; must select at least one Tag (from admin-managed list).
- Post card UI shows: author image, name, position, timestamp, tag pill, body, media, react/comment/save.
- No follower/following metrics anywhere.

#### 4.2 Events (unique feature)

- Creator sets requiredSlots (headcount).
Members click Request to Join (adds to pending).
- Creator sees Pending list and can Approve or Decline. 
- Approved users appear on the participant list, counter updates (N / requiredSlots).
- When full: status switches to full; optional waitlist if enabled.
- Event feed supports calendar view (month/week) and list view; export .ics for personal calendars.

#### 4.3 Tags & Admin Tagging

- Tags are predefined by Admin: Universities (open, SNU, SKKU, ..), Clubs (MSDC, ..), Batch (B21, B20, Alumni ..).
- Every Post/Event requires at least one Tag.
- Tag pills are clickable to filter feeds. (link with the search)

#### 4.4 Global Search (GitHub-style)

**Supports free text + operators:**
- tag:<slug> (e.g., tag:SNU, tag:MSDC, tag:B23)
- type:post | type:event | type:user | type:community
- author:@username, community:@danceclub
- Boolean: AND, OR, - (negation)
- Date: created:>=2025-01-01

**Examples shown in helper dropdown:**
```
tag:SNU type:event
type:post tag:B24
author:@soomin tag:Badminton
```

#### 4.5 Home Page Layout

**Main feed:** Latest posts & events (mixed), filter by Tags, Type.
**Top-right:** sticky Announcements widget (admin-assignable items).

No “who to follow” or follower counts.

#### 4.6 PPMK Page

- Only posts/events from Admin/PPMK accounts.
- **Hero section:** PPMK intro, mission, contact.
- **Sub-tabs:** Posts, Events, Announcements, About, members.

#### 4.7 Community Page (Directory)

Grid/list of all registered clubs (logo, name, short bio, tag).

**Clicking a community opens its Official Page:**
- **Info:** logo, cover, description, history, contacts, links.
- **Members:** list with images, names, positions.
- **Posts/Events:** filtered to that community.

Admins: manage club info and membership.

#### 4.8 User Profiles

Required position displayed next to name everywhere.
**Tabs:** Posts, Events, Communities, About.

No follower/following.

#### 4.9 Favourites

Users can save Posts/Events.
Favourites page supports folders (optional) and filters: type:event, tag:*.

#### 4.10 Notifications

Real-time or near-real-time.
**Triggered on:** event requests, approvals/declines, comments, mentions (@username), new announcements.

#### 4.11 Messages (DMs)

1:1 and small group chats (text + images).
Minimal, safe, report/leave options.

#### 4.12 Marketplace -*KIV*-

Route present in nav.
“Coming Soon” page with description.

## 5) Admin Console

- Manage users (activate/deactivate, assign position, promote to community admin).
- Tag manager (CRUD), with type validation.
- Community manager (approve new clubs, assign admins).
- Announcement composer (schedule, priority).
- Moderation queue (reports, takedown).
- Site settings: branding (colors/logo), time zone (default Asia/Kuala_Lumpur), i18n languages (EN/MY/KR).

## 7) Search Parsing (Acceptance)

- Parse tokens for tag:, type:, author:, community:, page:, created:>=, created:<=, boolean AND/OR, negation -tag:….
- Default scope reflects current page, e.g. Events page injects page:event unless overridden.
- Return results grouped by type with filters.

## 8) Acceptance Criteria (must have)

- No follow/follower UI anywhere.
- Every Post/Event requires exactly one Tag chosen from admin list.
- Event request/approval workflow works end-to-end with headcount tracking and status changes.
- PPMK Page shows only admin/PPMK content.
- Community directory + official pages with info, members (with positions), history, posts, events.
- Global search with GitHub-like operators + contextual (page:…) in placeholder.
- Home page shows Announcements (top-right) and Message Board (bottom-right).
- Favourites page saves Posts/Events and can filter by type/tag.
- Roles & permissions enforced; Marketplace shows “Coming Soon”.