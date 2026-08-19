.# Thailand travel website development plan

## Project Goal
Build a responsive React web app where users can discover, review, and get recommendations for travel places in Thailand.

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Netlify deployment
- Neon PostgreSQL database

## Design Direction
- Minimal visual style
- 3-color palette:
  - Dark blue
  - White
  - Brown
- Responsive layout for mobile, tablet, and desktop
- Smooth page transitions and section animations using Framer Motion

## Core Features

### Public Website
- Landing page
- Thailand travel place recommendations
- Travel reviews from users
- Responsive navigation
- Authentication links for login and registration

### Authentication
- User registration without OTP
- User login
- Protected user dashboard route
- Protected admin dashboard route
- Role-based access control:
  - `user`
  - `admin`

### User Dashboard
- User profile summary
- Saved or reviewed Thailand destinations
- Add or edit travel reviews
- View personal activity history

### Admin Panel
- View all registered users
- Track user actions such as:
  - registration
  - login
  - review creation
  - review update
  - review deletion
- Manage user roles
- Monitor review activity

### Routing Structure
- `/` — Landing page
- `/places` — Thailand travel recommendations
- `/reviews` — Public reviews
- `/register` — User registration
- `/login` — User login
- `/dashboard` — User dashboard
- `/admin` — Admin dashboard
- `/admin/users` — Admin user management
- `/admin/actions` — Admin action tracking
- `/admin/reviews` — Admin review moderation

## Database Plan

### Tables
- `users`
  - `id`
  - `name`
  - `email`
  - `password_hash`
  - `role`
  - `created_at`
  - `updated_at`

- `destinations`
  - `id`
  - `name`
  - `location`
  - `description`
  - `image_url`
  - `rating`
  - `created_at`
  - `updated_at`

- `reviews`
  - `id`
  - `user_id`
  - `destination_id`
  - `rating`
  - `title`
  - `content`
  - `status`
  - `created_at`
  - `updated_at`

- `user_actions`
  - `id`
  - `user_id`
  - `action_type`
  - `description`
  - `created_at`

## Required Environment Variables
Create a `.env` file with:

```env
VITE_API_BASE_URL=
NEON_DATABASE_URL=
JWT_SECRET=
NETLIFY_REDIRECT_URL=
```

## Build Steps
1. Create React + Vite project
2. Install Tailwind CSS
3. Install Framer Motion
4. Install React Router
5. Install database client
6. Create project folder structure
7. Add authentication pages and protected routes
8. Build public pages
9. Build user dashboard
10. Build admin panel
11. Connect Neon database
12. Add responsive styling
13. Add animations and transitions
14. Test locally
15. Deploy to Netlify

## Suggested Folder Structure
```txt
src/
  components/
  pages/
  layouts/
  routes/
  context/
  services/
  styles/
  utils/
```

## Notes
- Registration should not use OTP.
- Admin routes must be protected and restricted to admin users.
- User and admin dashboards must use separate React Router layouts.
- Keep UI minimal with dark blue, white, and brown only.
