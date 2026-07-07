# Thailand Travel Website - Project Plan

## 1. Project Overview
A modern travel website focused on Thailand tourism, offering destination guides, accommodation recommendations, local food discoveries, and a review system. The platform will support user dashboards and an admin panel for content management.

## 2. Tech Stack
- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS for nature-inspired themes
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6+
- **Authentication**: Context API + localStorage/session (simple JWT or session-based, no OTP)
- **Database**: Neon (PostgreSQL)
- **Backend/API**: Supabase Auth + REST API (or custom Node/Express + Neon)
- **Maps**: Google Maps Embed API
- **Deployment**: Netlify

## 3. Database Schema (Neon PostgreSQL)

### `users`
- id (uuid, primary key)
- email (varchar, unique)
- password_hash (varchar)
- full_name (varchar)
- avatar_url (text, nullable)
- role (enum: 'user', 'admin')
- created_at (timestamp)
- updated_at (timestamp)

### `destinations`
- id (uuid, primary key)
- name (varchar)
- slug (varchar, unique)
- region (enum: 'north', 'south', 'northeast', 'central')
- type (enum: 'nature', 'beach', 'mountain', 'waterfall', 'island')
- description (text)
- short_description (text)
- detailed_info (jsonb: { how_to_get_there, best_time_to_visit, estimated_cost, activities })
- hero_image (text)
- gallery (jsonb, nullable)
- location (jsonb: { lat, lng, address })
- featured (boolean, default: false)
- created_at (timestamp)
- updated_at (timestamp)

### `accommodations`
- id (uuid, primary key)
- destination_id (uuid, foreign key)
- name (varchar)
- type (enum: 'hotel', 'resort', 'hostel', 'guesthouse')
- price_range (varchar: budget, mid-range, luxury)
- price_min (decimal)
- price_max (decimal)
- amenities (jsonb)
- description (text)
- images (jsonb, nullable)
- rating_avg (decimal, default: 0)
- created_at (timestamp)
- updated_at (timestamp)

### `restaurants`
- id (uuid, primary key)
- destination_id (uuid, foreign key)
- name (varchar)
- dish_types (jsonb: recommended_dishes array)
- description (text)
- taste_description (text)
- spice_level (enum: 'mild', 'medium', 'hot', 'very_hot')
- price_range (varchar)
- images (jsonb, nullable)
- rating_avg (decimal, default: 0)
- created_at (timestamp)
- updated_at (timestamp)

### `reviews`
- id (uuid, primary key)
- user_id (uuid, foreign key)
- reviewable_type (enum: 'destination', 'accommodation', 'restaurant')
- reviewable_id (uuid)
- rating (integer, 1-5)
- title (varchar, nullable)
- comment (text)
- photos (jsonb, nullable)
- status (enum: 'pending', 'approved', 'rejected', default: 'pending')
- created_at (timestamp)
- updated_at (timestamp)

### `favorites`
- id (uuid, primary key)
- user_id (uuid, foreign key)
- favoritable_type (enum: 'destination', 'accommodation', 'restaurant')
- favoritable_id (uuid)
- created_at (timestamp)

## 4. Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── StarRating.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── ImageGallery.tsx
│   ├── destination/
│   │   ├── DestinationCard.tsx
│   │   ├── DestinationGrid.tsx
│   │   └── DestinationDetail.tsx
│   ├── accommodation/
│   │   ├── AccommodationCard.tsx
│   │   └── AccommodationList.tsx
│   ├── food/
│   │   └── RestaurantCard.tsx
│   ├── review/
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewList.tsx
│   │   └── ReviewCard.tsx
│   └── map/
│       └── GoogleMap.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── DestinationPage.tsx
│   ├── DestinationDetailPage.tsx
│   ├── AccommodationPage.tsx
│   ├── FoodPage.tsx
│   ├── SearchResultsPage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── user/
│   │   ├── UserDashboard.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── FavoritesPage.tsx
│   │   └── ReviewHistoryPage.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       ├── ManageDestinationsPage.tsx
│       ├── ManageAccommodationsPage.tsx
│       ├── ManageRestaurantsPage.tsx
│       └── ReviewModerationPage.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useDestinations.ts
│   └── useReviews.ts
├── context/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── destinations.ts
│   ├── accommodations.ts
│   ├── restaurants.ts
│   └── reviews.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── index.ts
├── styles/
│   ├── index.css
│   └── animations.css
├── App.tsx
├── main.tsx
└── routes.tsx

public/
├── images/
│   ├── destinations/
│   ├── accommodations/
│   └── restaurants/
└── favicon.ico

.env.example
.env
package.json
tailwind.config.js
postcss.config.js
vite.config.ts
tsconfig.json
netlify.toml
.gitignore
README.md
```

## 5. Core Features Breakdown

### Public Features
1. **Homepage**
   - Full-width hero slider with fade/slide animations
   - Featured destinations grid (Nature, Beaches, Mountains, Waterfalls, Islands)
   - Quick search and filter bar
   - Latest reviews section

2. **Destination Pages**
   - Grid with filter sidebar (region, type, budget)
   - Destination detail with hero image, map embed, activities, cost, best time to visit
   - Related accommodations and restaurants

3. **Accommodation Page**
   - Filter by price range, amenities, rating
   - User reviews and ratings
   - Booking info display

4. **Food Page**
   - Dishes with taste description and spice level
   - Restaurant recommendations per region

5. **Search & Filter**
   - Global search bar
   - Filter by region, place type, budget range
   - Sort by rating, price, popularity

6. **Map Integration**
   - Google Maps embed showing all places
   - Click markers to view details

### User Features
7. **Authentication**
   - Registration (email + password, no OTP)
   - Login
   - Password reset

8. **User Dashboard**
   - Saved favorites
   - Review history
   - Profile editing

9. **Review System**
   - Write reviews with star ratings
   - Upload photos
   - Review moderation (admin approval)

### Admin Features
10. **Admin Panel**
    - User management
    - Content management (CRUD for destinations, accommodations, restaurants)
    - Review approval/moderation
    - Statistics overview (users, reviews, popular destinations)

## 6. Styling & Design System

### Color Palette
- **Primary**: Emerald green (#10B981, #059669)
- **Secondary**: Teal (#14B8A6, #0D9488)
- **Background**: White (#FFFFFF) and Cream (#FFFBEB)
- **Dark Background**: Slate (#0F172A, #1E293B)
- **Accent/CTA**: Gold/Soft Orange (#F59E0B, #F97316)
- **Text**: Dark slate (#0F172A), muted (#64748B)
- **Success**: Emerald
- **Rating stars**: Amber (#F59E0B)

### Typography
- Headings: 'Inter' or 'Poppins' (Google Fonts)
- Body: 'Inter' for readability
- Line height: 1.6+
- Font sizes: Responsive scale

### UI Components
- Rounded corners: `rounded-2xl` or `rounded-3xl`
- Soft shadows: `shadow-lg`, `shadow-xl` with subtle colors
- Generous whitespace and padding
- Cards with hover effects
- Smooth gradients for hero sections

### Animations (Framer Motion)
- Page transitions with fade/slide
- Scroll-triggered fade-in elements
- Hero slider with ken burns effect
- Card hover animations (scale, shadow)
- Modal transitions

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Mobile-first approach

## 7. Implementation Phases

### Phase 1: Setup & Infrastructure (Week 1)
1. Initialize Vite + React + TypeScript project
2. Setup Tailwind CSS with custom theme
3. Configure project structure
4. Setup Neon database connection
5. Create database schema (migrations)
6. Setup basic routing
7. Create layout components (Navbar, Footer)
8. Implement Authentication context and pages (Register, Login)

### Phase 2: Core Layout & Public Pages (Week 2)
1. Build responsive Navbar with auth-aware links
2. Build Footer
3. Create Homepage with hero section (Framer Motion animations)
4. Implement Search & Filter components
5. Build Destination listing page
6. Build Destination detail page with Google Maps embed
7. Build Accommodation page
8. Build Food page

### Phase 3: Interactive Features (Week 3)
1. Implement Search & Filter functionality
2. Build review system (create, read)
3. Build star rating component
4. Implement photo upload for reviews
5. Build Google Maps integration
6. Implement API services
7. Add loading states and error handling

### Phase 4: User Dashboard (Week 4)
1. Protect user routes
2. Build User Dashboard layout
3. Implement Favorites functionality
4. Implement Review history
5. Build Profile page (edit profile)
6. User settings
7. Review submission and approval flow

### Phase 5: Admin Panel (Week 5)
1. Admin role-based access
2. Admin Dashboard with stats
3. Manage Destinations (CRUD)
4. Manage Accommodations (CRUD)
5. Manage Restaurants (CRUD)
6. Review moderation interface
7. User management view

### Phase 6: Polish & Deployment (Week 6)
1. Add sample/demo data
2. Test all features
3. Optimize images and performance
4. Ensure full responsiveness
5. Setup Netlify deployment
6. Configure environment variables
7. Final QA and bug fixes

## 8. Environment Variables (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# API Keys
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_APP_NAME=Thailand Travel Guide

# Admin
VITE_ADMIN_EMAIL=admin@example.com

# URLs
VITE_API_URL=https://your-api-url.com
VITE_BASE_URL=/
```

## 9. Key Technical Decisions
- **Authentication**: Simple email/password via Supabase Auth or custom implementation (no OTP)
- **Authorization**: Role-based access using router guards
- **File Uploads**: Store review photos in cloud storage (Cloudinary/S3) or base64 for MVP
- **State Management**: React Context for auth, local state for UI
- **API Communication**: Fetch/axios with React Query for data fetching/caching
- **Form Handling**: React Hook Form with validation
- **SEO**: React Helmet for meta tags
- **Map**: Google Maps Embed API (simple iframe embed for MVP)

## 10. Next Steps
1. Create project folder structure
2. Initialize Vite project with React + TypeScript
3. Install dependencies (Tailwind, Framer Motion, React Router, etc.)
4. Setup Tailwind configuration
5. Run server and verify setup
6. Create .env file
7. Begin Phase 1 implementation
