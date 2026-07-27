# SkyMart

E-commerce frontend built with React + Tailwind, using [Fake Store API](https://fakestoreapi.com) for real product data. Dark theme, lime accent.

## Tech Stack

- **React** (Vite)
- **react-router-dom** — routing
- **Tailwind CSS** — styling
- **lucide-react** — icons
- **Context API** — auth + cart state (no Redux/external store)
- **Fake Store API** — product data (fetched live, no backend of our own)
- **localStorage** — persists logged-in user, registered accounts, and cart between refreshes

## Features

- **Auth (Gmail-only)** — Register/Login only accept `@gmail.com` addresses. Accounts are stored in `localStorage` (no real backend), session persists across refreshes.
- **Protected routes** — Home, Shop, Product Detail, and About all require login; unauthenticated visits redirect to `/login`.
- **Home page** — hero, stats, categories, Top Rated / New Arrivals sections (both pulled live from Fake Store API, sorted by rating / id).
- **Shop page** — all products from the API, with working **search**, **category filter**, and **sort** (price low→high, high→low, top rated, name A-Z).
- **Product Detail page** (`/product/:id`) — full product info, quantity selector, Add to Cart.
- **Cart** — global state via Context, right-side slide-in drawer (open from any page), quantity +/-, remove item, running total, checkout (clears cart + confirmation), clear cart. Persists in `localStorage`.
- **Responsive navbar** — desktop shows full nav + user badge; mobile collapses into a hamburger menu with links, user info, and logout.
- **About page** — static company info page.

## Routes

| Path | Page | Protected? |
|---|---|---|
| `/login` | Login | No |
| `/register` | Register | No |
| `/` | Home | Yes |
| `/shop` | Shop (all products) | Yes |
| `/product/:id` | Product detail | Yes |
| `/about` | About | Yes |

## Folder Structure

```
src/
├── api/
│   └── fakeStoreApi.js        # fetch wrappers for Fake Store API
├── hooks/
│   ├── useProducts.js         # fetch all products
│   └── useProduct.js          # fetch a single product by id
├── context/
│   ├── AuthContext.jsx        # register/login/logout, gmail validation, localStorage
│   └── CartContext.jsx        # cart state, drawer open/close, localStorage
├── components/
│   ├── Navbar/Navbar.jsx      # desktop links + mobile hamburger menu
│   ├── Hero/Hero.jsx
│   ├── Stats/
│   ├── Categories/
│   ├── Products/              # Home page product list cards
│   ├── Shop/                  # Shop grid, filters, product card
│   ├── Cart/                  # CartDrawer, CartItem
│   ├── About/
│   ├── Features/
│   ├── Footer/
│   └── ProtectedRoute.jsx     # redirects to /login if not authenticated
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   └── About.jsx
├── data/
│   ├── categories.js          # static category tiles (Home)
│   ├── stats.js                # static stat card meta (Home)
│   └── about.js                # About page copy (stats/values/team)
├── App.jsx                    # routes + providers + global CartDrawer
└── main.jsx                   # BrowserRouter mount
```

## Setup

```bash
npm install
npm run dev
```

Requires `react-router-dom` and `lucide-react` (already in `package.json` if you ran `npm install react-router-dom` as instructed earlier).

## Notes / Known Limitations

- **No real backend** — auth and cart are `localStorage`-only. Clearing browser storage logs everyone out and empties carts. Good enough for a demo/portfolio project, not for production.
- **Fake Store API is read-only and shared** — "Add to Cart" doesn't actually hit the API's cart endpoints; cart is handled entirely on our side via Context + localStorage.
- **Checkout is a placeholder** — clicking Checkout clears the cart and shows a success message; there's no payment or order history.
- Category tiles and stats on the Home page (`data/categories.js`, `data/stats.js`) are still static placeholder numbers, not derived from the live API.
