# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Production build
npm run build

# Run tests
npm test

# Run a single test file
npm test -- --testPathPattern=ComponentName
```

## Architecture

### Overview
React SPA (Create React App) with two completely separate sections sharing the same app:

1. **Shop** (`/`, `/products`, `/cart`, `/checkout`, `/build-your-cake`, etc.) — customer-facing storefront
2. **Admin Dashboard** (`/admin/*`) — order and product management; gated by `PrivateRoutes`

### Routing (`src/App.js`)
- The shop section uses `ShopHome` as a layout wrapper with nested `<Outlet>` routes
- `/admin` and `/admin/*` both render `<DashHome>`, which handles its own internal sub-navigation
- Auth guard (`PrivateRoutes`) checks `localStorage.user_logged_in === true` — this is set by `src/services/auth.js` after a successful login response

### API Communication (`src/services/`)
All backend calls target `https://staging-api.tatchcakery.com/api/` hardcoded per service file. There is **no global HTTP client or interceptor** — each file uses native `fetch` directly.

| File | API area |
|---|---|
| `services/auth.js` | `/api/auth/login`, `/api/auth/logout` |
| `services/shop/products.js` | `/api/products/` |
| `services/shop/cart.js` | `/api/cart/` |
| `services/shop/home.js` | `/api/shop-home/` |
| `services/dashboard/products.js` | `/api/dash/dash-products` |
| `services/dashboard/orders.js` | `/api/dash/orders` |

Every call passes `credentials: "include"` so the browser sends the session cookie automatically. The cart is stateless on the frontend — the backend owns cart state via a `cart_id` cookie. The frontend just calls `GET /api/cart` to hydrate.

### Cake Customization (`src/components/shop/CakeCustomization.jsx`)
The most complex feature. Customers configure a custom cake (flavor, filling, cream, top cream, decorations/motifs, text). State is built into a config object by `src/services/utils/builder.js` (`buildConfigFromState`) and serialized into the cart `add` payload. The SVG visualizer (`SVGVisualizerV2.jsx`) renders a live preview; the SVG is serialized (`serializeSvg`) and sent to the backend as `preview_svg`. Customization options (codes, labels, prices) are defined statically in `src/services/shop/customizationOptions.js` — not fetched from the API.

When editing an existing cart item, `applyConfigToState` rehydrates the builder UI from the stored config returned by `GET /api/cart/items/{id}`.

### Dashboard (`src/components/dashboard/`)
- `DashboardMain.jsx` + `DashboardSideBar.jsx` compose the layout
- `DashHome.jsx` is the top-level route component that renders the appropriate sub-page
- Products support image upload via `FormData` (multipart); the service sends `POST` with `?_method=PUT` for edits (Laravel method spoofing)
- Orders support accept/reject actions, delivery option changes, and quantity updates

### State Management
No Redux or global state library. State is kept local to components. The only shared state mechanism is:
- `localStorage` — for `user_logged_in` flag (checked by `PrivateRoutes`)
- `src/services/utils/global-state.js` — a plain JS object (`GLOBAL_STATE`) used for simple cross-component flags (currently just `isLoading`)

### Notifications
`react-toastify` is used throughout. Toast helpers live in `src/services/utils/toasts.js`.

### Analytics
`src/analytics/ga.js` — Google Analytics integration. `RouteTracker.js` fires a page view on every route change.

this app deploys to Vercel, and the backend API lives in ../backend on a DigitalOcean droplet.
