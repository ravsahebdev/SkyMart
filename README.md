# SkyMart

A responsive e-commerce storefront built with React. Browse products from a live REST API, filter and search, save favourites, manage a cart, and place orders through a checkout flow.

**Live demo:** <your-deployed-link>

## Features

- **Authentication** with register / login and protected routes (demo auth, stored in `localStorage`, Gmail addresses only)
- **Shop** page with search, category filter and sorting
- **Explore** page with server-side category filtering, debounced search, quick view modal and hover prefetching
- **Product detail** pages
- **Cart drawer** available from every page, with quantity controls and persistence across refreshes
- **Wishlist** that stays in sync across the app
- **Checkout** with form validation and a real `POST` request to the API
- **Order history** page
- Loading skeletons, error states with retry, and empty states throughout
- Fully responsive, mobile navigation included

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React, React Router, Tailwind CSS, Lucide icons |
| Server state | TanStack Query |
| Client state | Redux Toolkit (with thunks), React Context |
| Data | [Fake Store API](https://fakestoreapi.com/docs) (REST) |
| Tooling | Vite |

## Getting Started

```bash
git clone https://github.com/ravsahebdev/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

The app runs on `http://localhost:5173`. Create an account with any `@gmail.com` address to log in (accounts live in your browser's local storage).

Production build:

```bash
npm run build
npm run preview
```

## How State Is Managed

Different kinds of state live in different places on purpose:

- **Server data** (products, categories, product details) is handled by **TanStack Query**. Query keys are centralised in `src/queries/productQueries.js`, results are cached for 5 minutes, and product details are prefetched when you hover a card so the quick view opens instantly. The wishlist page reads from the same cache, so items already loaded on Explore are not fetched again.
- **App state that belongs to the user** (wishlist, order history) lives in a **Redux Toolkit** store and is persisted to `localStorage`.
- **Checkout** is a thunk. `placeOrder` is a `createAsyncThunk` that sends the `POST /carts` request and handles pending / fulfilled / rejected states. A small hand-written `checkout` thunk wraps it, guards against double submits, and clears the cart once the order succeeds.
- **Auth and cart** use the Context API, since they are simple, global and needed everywhere.

## Project Structure

```
src/
├── api/             REST calls (fakeStoreApi.js, storeApi.js)
├── components/      UI grouped by feature (Navbar, Cart, Shop, Explore, ...)
├── context/         AuthContext, CartContext
├── hooks/           Data hooks used by the Shop and detail pages
├── pages/           Route-level pages
├── queries/         TanStack Query client, keys and hooks
├── store/           Redux Toolkit store, slices and thunks
├── App.jsx          Routes
└── main.jsx         Providers and app entry
```

## API Endpoints Used

| Method | Endpoint | Used for |
| --- | --- | --- |
| GET | `/products` | Shop and Explore listings |
| GET | `/products/:id` | Product detail, quick view, wishlist |
| GET | `/products/categories` | Category filters |
| GET | `/products/category/:name` | Server-side category filtering |
| POST | `/carts` | Placing an order |

## Notes

- Fake Store API returns a response for `POST /carts` but does not store the data, so order history is kept in the browser.
- Authentication is a front-end demo only. Passwords are stored in `localStorage` and this is not meant for production use.
- Wishlist and orders are stored per browser, not per account.

## Author

**Ravsaheb Vagre**
[GitHub](https://github.com/ravsahebdev) · [LinkedIn](https://linkedin.com/in/ravsaheb-vagre-47b86a35a)
