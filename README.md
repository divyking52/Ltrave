# L’TRAVE — Premium Travel Discovery Website

> *“Go Somewhere Beautiful.”*

A soft pastel, luxury editorial travel discovery magazine and interactive journey planner built with React, Vite, and Tailwind CSS.

---

## ✨ Features

- **Cinematic Orbital Intro Flight**: Supersonic jet take-off from the screen corner, completing a full 360° orbital revolution around the official L’Trave crest before docking with celebratory pastel confetti and an ethereal sunburst bloom.
- **Editorial Pastel Aesthetics**: Soft blush (`#F6D9DC`), apricot (`#F9D5CA`), lavender (`#E2DDF5`), mint (`#D9F0E4`), and warm cream (`#FFF9F4`) with Didone typography.
- **3D Fluid Silk Wave Background**: Animated floating background layer with zero clipping or hard edge artifacts.
- **Interactive Destination Matcher**: Filter by travel mood, trip style, and climate to receive personalized animated recommendation cards.
- **Featured Destinations**: Asymmetric magazine-style editorial layout with rich photo carousels, budget indicators, and bookmarking.
- **5-Step Interactive Trip Planner**: Build custom travel itineraries with live pricing estimates, day-by-day plans, and local food highlights.
- **Field Stories & Editorial Journal**: Traveler perspectives and curated destination guides.
- **Ambient Soundscapes & Passport Stamps**: Mediterranean waves, mountain breeze, rain showers, and collectible passport stamps.

---

## 🚀 Deploy to Render (Static Site)

This repository includes a preconfigured `render.yaml` for automatic Render Blueprint deployment.

### Method 1: Automatic Blueprint (Recommended)
1. Go to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** → **Blueprint**.
3. Select your repository: `https://github.com/divyking52/Ltrave`.
4. Click **Apply**. Render will automatically detect `render.yaml` and deploy your static site.

### Method 2: Manual Static Site
1. Go to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** → **Static Site**.
3. Connect your GitHub repository `divyking52/Ltrave`.
4. Fill in the build settings:
   - **Name**: `ltrave`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Under **Redirects/Rewrites**:
   - **Source**: `/*`
   - **Action**: `Rewrite`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## 🛠 Local Development

```bash
# Clone the repository
git clone https://github.com/divyking52/Ltrave.git
cd Ltrave

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
