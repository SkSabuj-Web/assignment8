# Assignment 8 — Client (Next.js 16 + Better Auth + Tailwind CSS)

এআই সেশন অ্যাসাইনমেন্ট ৮-এ একদম বেসিক বিষয়গুলো সহজভাবে দেখানো হয়েছে। যেমন: `proxy.js`, CRUD অপারেশন, JWT ইত্যাদি। নিচে ডকুমেন্টের লিংক দেওয়া আছে:

- **Doc Link:** https://docs.google.com/document/d/1UBAavs_F3P2zeP4l7e7CnbRCF5cUC1QuXkcjKG2IJ70/edit?usp=sharing

---

## Tech Stack
- **Framework:** Next.js 16 (App Router + Turbopack)
- **React:** React 19
- **Authentication:** Better Auth (with `jwt` server plugin & `jwtClient` client plugin)
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB (via `@better-auth/mongo-adapter`)
- **Icons & Alerts:** Lucide React & React Hot Toast

---

## Features
- **Authentication:**
  - Email & Password Sign Up with profile image preview.
  - Email & Password Login.
  - Better Auth Session Cookie Cache (`jwt` strategy, 7 days maxAge).
  - JWKS endpoint exposed automatically at `/api/auth/jwks`.
- **Proxy / Middleware (`src/proxy.js`):**
  - Route protection for `/safe` and protected pages.
- **Data & Products:**
  - View all products (`/get-data`) with server-side token injection (`getTokenFromServer`).
  - View single product details (`/get-data/[id]`).
  - Add product (`/add-data`) with client-side token injection (`getTokenFromClient`).
  - Edit and Delete product.

---

## Environment Variables Setup
Create a `.env.local` file in the `client` directory:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_here
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

---

## How to Run

### Development Mode:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm run start
```

### Linting:
```bash
npm run lint
```
Client runs at `http://localhost:3000`.
