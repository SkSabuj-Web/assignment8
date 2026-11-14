# Assignment 8 — Backend Server (Express + MongoDB + Better Auth JWT)

এআই সেশন অ্যাসাইনমেন্ট ৮-এ একদম বেসিক বিষয়গুলো সহজভাবে দেখানো হয়েছে। যেমন: `proxy.js`, CRUD অপারেশন, JWT ইত্যাদি। নিচে ডকুমেন্টের লিংক দেওয়া আছে:

- **Doc Link:** https://docs.google.com/document/d/1UBAavs_F3P2zeP4l7e7CnbRCF5cUC1QuXkcjKG2IJ70/edit?usp=sharing

---

## Features
- **Express 5 Server:** RESTful API with JSON support and CORS.
- **MongoDB Database:** Connected with official `mongodb` driver.
- **Better Auth JWT Verification:** Uses `jose` and remote JWKS (`/api/auth/jwks`) from Next.js to protect sensitive API endpoints.
- **Complete CRUD Endpoints:**
  - `GET /` — Health check endpoint.
  - `GET /products` — Protected endpoint (requires valid JWT token).
  - `POST /products` — Add a new product.
  - `GET /products/:id` — Get single product details.
  - `PATCH /products/:id` — Update a product.
  - `DELETE /products/:id` — Delete a product.

---

## Environment Variables Setup
Create a `.env` file in the `server` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

---

## How to Run

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production / Start:
```bash
npm start
```
Server runs at `http://localhost:8000`.
