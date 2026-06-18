# ShopVibe

ShopVibe is a responsive React storefront inspired by familiar Indian e-commerce experiences. It uses a navy, amber, and white design system and includes product discovery, category filtering, cart management, deals, reviews, and newsletter interactions.

## Features

- Live product search with a keyboard-accessible suggestion dropdown.
- Department and category filters that update the product grid.
- Functional cart drawer with an empty state, item quantities, remove actions, item count, and subtotal.
- Product cards with pricing, discounts, ratings, wishlist controls, and add-to-cart actions.
- Deal-of-the-day section with a countdown timer.
- Auto-playing hero carousel with manual controls.
- Responsive layouts for desktop, tablet, and mobile screens.
- Toast feedback for cart and wishlist actions.
- Newsletter form validation and smooth back-to-top navigation.

## Search and cart behavior

Start typing a product name in the header search field to see matching suggestions from the selected department. Use the mouse or the arrow keys and Enter to choose a suggestion. Selecting a result filters the catalog and scrolls to that product. Clearing the search field also resets the department to **All Departments** so the complete catalog returns.

Select **Add to Cart** on any product or deal, then use the **Cart** button in the header to open the cart drawer. From there you can increase or decrease quantities, remove products, review the subtotal, or continue shopping. Selecting **Proceed to Checkout** confirms the demo order, clears the cart, and displays a success message. No real payment is processed.

## Tech stack

- React 19
- Vite 8
- Vanilla CSS
- Lucide React icons

## Project structure

```text
.
├── public/
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx
│   │   ├── Categories.jsx
│   │   ├── CustomerReviews.jsx
│   │   ├── DealOfDay.jsx
│   │   ├── FeaturedBrands.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── Newsletter.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductListing.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── mockData.js
├── index.html
├── package.json
└── vite.config.js
```

## Getting started

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Vite may choose the next available port if 5173 is already in use.

## Quality checks

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.
