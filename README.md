# ShopVibe

ShopVibe is a responsive React storefront inspired by familiar Indian e-commerce experiences. It uses a navy, amber, and white design system and includes product discovery, category filtering, cart management, deals, reviews, and newsletter interactions.

## Features

- **Interactive User Authentication**: A pop-up login/register [AuthModal](src/components/AuthModal.jsx) with input validation and a **One-Click Demo User (Jash Barot)** preset to test prime features.
- **Header Account Dropdown**: Tapping on the Account button displays an interactive lists overlay showing links to Orders, Wishlists, Account settings, or Sign Out.
- **Detailed Account Settings Dialog**: The tabbed [AccountModal](src/components/AccountModal.jsx) manages:
  - **My Profile**: Name, Email, Mobile number, Prime Membership Status toggle, and default delivery address.
  - **Your Orders**: Interactive list of past orders showing item lists, purchase dates, status badges, and "Buy it again" options.
  - **Wishlist**: Displays currently favorited items with options to quickly add to cart or remove.
- **Product Details Modal**: Clicking on any product image or title opens [ProductDetailModal](src/components/ProductDetailModal.jsx) showing dynamic technical specifications, pricing discount calculations, shipping badges, quantity selectors, and direct cart actions.
- **Focused Listing Layout**: Banners, Deals of the Day, Brands, and Customer Reviews hide automatically when a search query is active or a category is selected (e.g. clicking the **Electronics** subnav link), showing the filtered product catalog right at the top.
- **All Department Navigation**: The subnav **All** category link clears active searches and department filters, restoring the full homepage layout instantly.
- **State Persistence**: Cart, Wishlist, User settings, and Order histories are persisted across page reloads using browser `localStorage`.
- **Toast Notifications**: Interactive toast alerts for cart and wishlist status changes.
- **Responsive Layout**: Designed for all device screens (Mobile, Tablet, and Desktop).

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
│   │   ├── AccountModal.jsx
│   │   ├── AuthModal.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── CustomerReviews.jsx
│   │   ├── DealOfDay.jsx
│   │   ├── FeaturedBrands.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── Newsletter.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
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
