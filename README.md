# ShopVibe

ShopVibe is a responsive React storefront inspired by familiar Indian e-commerce experiences. It uses a navy, amber, and white design system and includes product discovery, category filtering, cart management, deals, reviews, and newsletter interactions.

## Features

- **Interactive User Authentication**: A pop-up login/register [AuthModal](src/components/AuthModal.jsx) with input validation and a **One-Click Demo User (Jash Barot)** preset to test prime features.
- **Header Account Dropdown**: Tapping on the Account button displays an interactive lists overlay showing links to Orders, Wishlists, Account settings, or Sign Out.
- **Detailed Account Settings Dialog**: The tabbed [AccountModal](src/components/AccountModal.jsx) manages:
  - **My Profile**: Name, Email, Mobile number, Prime Membership Status toggle, and default delivery address.
  - **Your Orders**: Interactive list of past orders showing item lists, purchase dates, status badges, and "Buy it again" options.
  - **Wishlist**: Displays currently favorited items with options to quickly add to cart or remove.
- **Today's Deals**: A dedicated hot deals filter that highlights catalog items with discounts of 25% or higher, with automatic smooth-scrolling to the catalog results.
- **Customer Service Hub**: A comprehensive help portal [CustomerServiceModal](src/components/CustomerServiceModal.jsx) containing article search matching common questions (refund window, tracking, prime status) and an interactive AI VibeBot chatbot that replies contextually.
- **Gift Registry Center**: A checklist manager [RegistryModal](src/components/RegistryModal.jsx) where users can create registries for events (weddings, birthdays), search for others' registries, register catalog items, copy share links, and check off purchased gifts.
- **Gift Cards & Virtual Wallet**: A digital store [GiftCardsModal](src/components/GiftCardsModal.jsx) where users can buy themed digital cards or top up a persistent wallet balance using claim codes (like `WELCOME1000` or `VIBE500`).
- **Seller Portal**: A merchant registration interface [SellModal](src/components/SellModal.jsx) requiring a store profile setup (onboarding screen) that lets vendors select preset stock illustrations and list custom items directly into the live catalog feed.
- **Product Details Modal**: Clicking on any product image or title opens [ProductDetailModal](src/components/ProductDetailModal.jsx) showing dynamic technical specifications, pricing discount calculations, shipping badges, quantity selectors, and direct cart actions.
- **Focused Listing Layout**: Banners, Deals of the Day, Brands, and Customer Reviews hide automatically when a search query is active or a category is selected (e.g. clicking the **Electronics** subnav link), showing the filtered product catalog right at the top.
- **All Department Navigation**: The subnav **All** category link clears active searches and department filters, restoring the full homepage layout instantly.
- **State Persistence**: Cart, Wishlist, User settings, Wallet balance, registered merchant profiles, and Order histories are persisted across page reloads using browser `localStorage`.
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
│   │   ├── CustomerServiceModal.jsx
│   │   ├── DealOfDay.jsx
│   │   ├── FeaturedBrands.jsx
│   │   ├── Footer.jsx
│   │   ├── GiftCardsModal.jsx
│   │   ├── Header.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── Newsletter.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
│   │   ├── ProductListing.jsx
│   │   ├── RegistryModal.jsx
│   │   └── SellModal.jsx
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
