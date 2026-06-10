# ShopVibe - E-Commerce Landing Page Clone (Amazon / Flipkart UI)

ShopVibe is a premium, fully responsive, and highly interactive UI-only e-commerce landing page clone inspired by **Amazon** and **Flipkart**. It is built using **ReactJS** (bootstrapped with **Vite**) and styled using pure **Vanilla CSS** with a curated dark-navy, amber, and white design system.

The application has been fully localized for the Indian e-commerce market, incorporating Rupee pricing, Indian numbering system format, local brands, regional shipping tags, and custom testimonials.

---

## 🚀 Key Features

1. **Dynamic Search & Header Navigation**
   - Interactive search input that filters product listings in real-time as the user types.
   - Dynamic department filter selector.
   - Dynamic Shopping Cart badge count that updates instantly as items are added.
   - Static localization marker ("Deliver to India") and user profile dropdown tabs.

2. **Automated Hero Banner Carousel**
   - Custom carousel slides showcasing electronics, fashion, and home categories.
   - Auto-play rotation (changes slides every 5 seconds) paired with manual previous/next chevron controls and slider dot indicators.

3. **Shop by Category Grid**
   - Highlights Electronics, Fashion, Home & Kitchen, Beauty, Grocery, and Sports.
   - Custom scale-up hover micro-animations.
   - Clicking a category card dynamically filters the main product list below.

4. **Deal of the Day (Live Countdown Timer)**
   - Highlights limited-time offers with special discount tags (up to 77% OFF).
   - Implements a dynamic ticking countdown timer that calculates hours, minutes, and seconds remaining until midnight and updates every second.

5. **Product Listing Grid**
   - Dynamically renders 9 detailed product cards using `Array.map()`.
   - Incorporates discount labels, original strikethrough prices, and custom split SVG star rating calculators (supporting half-stars).
   - Interactive "Add to Cart" and "Wishlist" toggles on each card.
   - Handled empty search results state with a helper "Clear Filters" button.

6. **Interactive Toast Notifications**
   - Sliding toast notifications that alert the user in the bottom-right corner when an item is added to the cart or toggled on the wishlist.

7. **Newsletter Form Validation**
   - Validates email address format in real-time using React state.
   - Shows active hints for invalid entries and renders a success check banner on submission.

8. **Footer**
   - Detailed site directories and social links with hover micro-animations.
   - Fully interactive "Back to Top" scrolling scroller that glides the viewport smoothly to the top.

---

## 🛠️ Tech Stack

- **Core**: ReactJS (Functional Components, Hooks like `useState` & `useEffect`)
- **Build Tool**: Vite (Ultra-fast bundler)
- **Styling**: Vanilla CSS (Custom properties, Flexbox, Grids, and transitions)
- **Icons**: Lucide React (Clean, scalable SVGs)

---

## 📁 File Structure

```text
2/
├── public/
│   ├── favicon.svg        # Custom branded ShopVibe favicon
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Search, cart badge, department selectors
│   │   ├── HeroCarousel.jsx    # Automatic/manual promotion slides
│   │   ├── Categories.jsx      # Dynamic category filter cards
│   │   ├── DealOfDay.jsx       # Deals grid and ticking midnight timer
│   │   ├── ProductListing.jsx  # Main grid layout & filter controller
│   │   ├── ProductCard.jsx     # Ratings stars, wishlist, cart button
│   │   ├── FeaturedBrands.jsx  # Partner logos with scaling effects
│   │   ├── CustomerReviews.jsx # Reviews with verified checkmarks
│   │   ├── Newsletter.jsx      # Input validation & success feedback
│   │   └── Footer.jsx          # Directory links and back-to-top handler
│   ├── App.jsx            # Orchestrates global state & layout assemblies
│   ├── index.css          # Core design tokens, layout styles, and animations
│   ├── main.jsx           # Mounts the React app
│   └── mockData.js        # Indian products, reviews, slide banners, and brands
├── index.html             # descriptive titles and SEO meta descriptions
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd Clone-a-landing-page-Amazon-Flipkart-UI-ReactJS-
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To run the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the page.

### Building for Production
To bundle the application for production deployment:
```bash
npm run build
```
The compiled files will be created in the `dist/` directory.
