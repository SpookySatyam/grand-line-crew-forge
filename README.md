# Grand Line Crew Forge

An interactive, pirate-themed full-stack application built to test and showcase React, Node.js, Express, MongoDB, and Tailwind CSS. The app lets users recruit crew members, form balanced teams, assign challenges, and track their stats on a dynamic dashboard.

## 🏗️ Architecture Overview

The project is structured as a full-stack monorepo:

### Frontend (`/`)
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Framer Motion for animations
- **State Management**: Zustand (with centralized `useAuthStore` and `useStore`)
- **Routing**: React Router v6
- **HTTP Client**: Native `fetch` with a custom `apiFetch` wrapper for centralized error handling and auth redirects.

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Validation**: Zod for robust request payload validation.
- **Security**: Helmet, Express Mongo Sanitize, Express Rate Limit, and CORS configured for secure client-server communication.

---

## 🚀 Environment Variables

You need a `.env` file in the `/server` directory:

```env
# Server settings
PORT=5000
NODE_ENV=development # Set to 'production' when deploying

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/grand-line

# Authentication
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars
JWT_EXPIRES_IN=7d

# CORS / Frontend connection
CLIENT_URL=http://localhost:5173 # Set this to your frontend URL in production
```

For the frontend, if your backend isn't hosted on the same domain (or proxying isn't available), you can set the backend URL by creating a `.env` file in the root directory:

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local instance or Atlas Cluster)

### Setup

1. **Install Dependencies**
   Run the following from the root directory to install both frontend and backend dependencies using concurrently:
   ```bash
   npm install
   cd server && npm install
   ```

2. **Configure Environment**
   Create a `server/.env` file with the variables listed above.

3. **Start the App**
   From the root directory, run:
   ```bash
   npm run dev
   ```
   This will use `concurrently` to start both the Vite dev server (on port 5173) and the Node/Express backend (on port 5000).

---

## 🧪 Testing

The backend includes integration tests written with **Vitest**, **Supertest**, and **MongoDB Memory Server** for isolated database testing.

To run the backend tests:
```bash
cd server
npm test
```

---

## 🗺️ API Endpoint Table

| Endpoint | Method | Auth Req. | Description |
|----------|--------|-----------|-------------|
| `/api/auth/signup` | POST | No | Register a new user and set JWT cookie |
| `/api/auth/login` | POST | No | Authenticate user and set JWT cookie |
| `/api/auth/logout` | POST | No | Clear the JWT cookie |
| `/api/auth/me` | GET | Yes | Get the currently authenticated user |
| `/api/recruits` | GET | Yes | List all recruits owned by the user |
| `/api/recruits` | POST | Yes | Create a new recruit |
| `/api/recruits/:id` | PUT | Yes | Update a recruit |
| `/api/recruits/:id` | DELETE | Yes | Delete a recruit |
| `/api/challenges` | GET | Yes | List all challenges |
| `/api/challenges` | POST | Yes | Create a challenge |
| `/api/crews` | GET | Yes | List all formed crews |
| `/api/crews/form` | POST | Yes | Algorithmic team formation |
| `/api/dashboard/stats` | GET | Yes | Aggregated statistics for the dashboard |

---

## 🚢 Deployment Steps

This app is designed to be split into two deployments:

### 1. Backend (Render / Railway / Heroku)
1. Push your code to GitHub.
2. Connect your repository to your hosting provider.
3. Set the **Root Directory** to `server`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add all the Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL=https://your-frontend.vercel.app`).
7. Note the URL your backend is deployed to.

### 2. Frontend (Vercel / Netlify)
1. Connect your repository to Vercel/Netlify.
2. The root directory should be `/` (the root of the repo).
3. The Build Command is `npm run build` and Output Directory is `dist`.
4. Add the Environment Variable `VITE_API_URL` and set it to your deployed backend URL (e.g., `https://my-backend.onrender.com`).
5. Deploy!

### 3. MongoDB Atlas
- Go to Network Access in MongoDB Atlas.
- Add the IP address of your backend server (or `0.0.0.0/0` if you must, though not recommended for production).
- Ensure your Database User has read/write privileges.

---

> *"Wealth, fame, power. The man who had acquired everything in this world, the Pirate King, Gol D. Roger."* - Now go deploy your own crew!
