# Steam Analytics Dashboard - Feature Overview

## 🎨 The Duality of Realms Theme System

### Dark Mode - Space Theme (Luar Angkasa)
- **Deep Cosmic Black background** with purple and blue nebula gradients
- **Parallax effects** that respond to mouse movement
- **100+ animated stars** with varying sizes and twinkle effects
- **Shooting stars** with trailing effects
- **Floating astronaut (🚀)** and satellite (🛸) animations
- **Asteroid belt** crossing the screen diagonally
- **Neon glow effects** on UI elements (purple/blue)

### Light Mode - Nature Theme (Alam)
- **Sky gradient** from soft blue to emerald green
- **Animated sun** with pulsing glow effect
- **Parallax mountain layers** in the background
- **Multi-layer forest** with trees at different depths
- **8 animated butterflies (🦋)** flying across the screen
- **20 bokeh pollen particles** floating slowly
- **15 falling leaves (🍃)** with rotation and drift
- **Distant waterfall** with flowing animation

### Celestial Gate Transition
- **Circular reveal animation** expanding from center
- **Gradient color burst** during transition
- **Sub-1-second smooth transition** between themes
- **Theme toggle button** with glow effects matching current theme

## 📊 Pages & Features

### 1. Home Page (Hero Landing)
- **Retro game controller icon** in header
- **Large hero banner** with main title and subtitle
- **"EXPLORE DASHBOARD" button** with smooth scroll
- **Animated down chevron** indicating more content below
- **4 interactive tabs**: Hidden Gems, Best Value, Toxic Games, Popular Games
- **Large description panels** in Bahasa Indonesia for each category
- **4 staggered navigation buttons** with unique colors per category
- **Category-specific color schemes**:
  - Hidden Gems: Yellow/Amber
  - Best Value: Green/Emerald
  - Toxic Games: Red/Rose
  - Popular Games: Blue/Cyan

### 2. Ranking Page
- **Two-level navigation bar** with back/home buttons
- **Search functionality** with icon and real-time filtering
- **Sort controls** with ascending/descending toggle
- **Top 10 Games Comparison Chart** (Recharts bar chart)
  - Shows top 10 games in the current category
  - Single bar chart displaying game scores
  - Game names on X-axis (truncated for readability)
  - Interactive tooltips with full game information
  - Loading state during data fetch
- **4x3 game grid** (12 cards total)
  - Trophy/Medal icons for top 3 ranks
  - Rank number for positions 4+
  - Score badges with category colors
  - Game name with hover effects
  - Detail button in bottom-right
  - Staggered fade-in animations
- **Category-specific styling** throughout

### 3. Detail Analysis Page
- **Game identity panel** with:
  - Large game icon (gradient placeholder)
  - Game name and badges
  - Rank badge with trophy icon
  - Total score badge
  - 5-star rating display
- **4 metric scorecards** (horizontal layout):
  - Hidden Gems (Eye icon, Yellow theme)
  - Value Score (Dollar icon, Green theme)
  - Toxicity (Alert icon, Red theme)
  - Popularity (Users icon, Blue theme)
  - Each with gradient backgrounds
- **50/50 split chart section**:
  - **Left**: Spider/Radar chart (multidimensional analysis)
  - **Right**: Horizontal bar chart (score comparison)
  - Both use Recharts with custom styling
- **Action buttons** to return home or back to rankings

### 4. 404 Not Found Page
- Full parallax background
- Large "404" in theme colors
- Friendly error message
- Navigation buttons to go home or back

## 🔌 API Integration

### Real-time Data Fetching
- **Automatic API detection** at `http://127.0.0.1:8000`
- **Graceful fallback** to mock data if API unavailable
- **Loading states** with animated spinners
- **Error handling** with console warnings
- **TypeScript types** for all data structures

### Endpoints
1. `GET /api/games/{category}` - Fetch games by category
2. `GET /api/game/{gameId}` - Fetch detailed game information

### Mock Data
- Realistic game names for each category
- Randomized but believable scores
- Proper data structure matching API expectations

## 🎭 Animations & Effects

### Background Animations
- **Parallax layers** responding to mouse movement
- **Floating animations** (6s duration) for space objects
- **Butterfly animations** (10s looping paths)
- **Falling leaves** (8-12s with rotation)
- **Shooting stars** (3s diagonal trails)
- **Waterfall flow** (2s pulse effect)

### UI Animations
- **Fade-in-up** for page content
- **Staggered animations** for grid items (0.05s delays)
- **Hover scale effects** on cards and buttons
- **Smooth color transitions** on all interactive elements
- **Celestial Gate** theme transition (1s burst effect)

### Interactive Elements
- **Button hover effects** with scale transforms
- **Card hover** with border color changes
- **Input focus states** with theme-colored borders
- **Loading spinners** with dual-ring animation

## 🎯 Technical Highlights

- **React Router** for navigation and routing
- **Next Themes** for dark/light mode management
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **TypeScript** for type safety
- **Responsive design** for all screen sizes
- **Accessibility features** (ARIA labels, semantic HTML)

## 🌐 Responsive Design

- Mobile-first approach
- Grid layouts that adapt: 1 col → 2 cols → 3 cols → 4 cols
- Flexible navigation bar with wrapping
- Optimized animations for performance
- Touch-friendly button sizes

## 🎨 Color Palette

### Dark Mode
- Background: Deep Cosmic Black (#0f172a)
- Primary: Purple (#8b5cf6)
- Secondary: Blue (#3b82f6)
- Accents: Cyan, Pink, Yellow

### Light Mode
- Background: Ivory/Sky gradient
- Primary: Green (#16a34a)
- Secondary: Emerald (#10b981)
- Accents: Yellow, Blue, Amber

## 📱 User Experience

- **Instant visual feedback** on all interactions
- **Smooth page transitions** with loading states
- **Contextual navigation** (breadcrumbs, back buttons)
- **Search and filter** capabilities
- **Sortable data** with visual indicators
- **Informative error states** (404 page)
- **Theme persistence** across pages
- **Magical theme switching** experience