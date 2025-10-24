## 💻 FRONTEND STRUCTURE (React + Tailwind + Recharts)

### 📁 Folder Structure

```
frontend/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CreateLinkForm.jsx
│   │   ├── LinkCard.jsx
│   │   ├── AnalyticsChart.jsx
│   │   ├── DevicePieChart.jsx
│   │   ├── QRModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LinkDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   └── utils/
│       └── api.js
```

---

## 🧭 FRONTEND ROUTES (React Router)

| Path         | Page        | Description                         |
| ------------ | ----------- | ----------------------------------- |
| `/`          | Home        | Public page to shorten links        |
| `/login`     | Login       | User login                          |
| `/register`  | Register    | User registration                   |
| `/dashboard` | Dashboard   | User’s list of created links        |
| `/link/:id`  | LinkDetails | Analytics for a specific short link |

---

## 🧱 PAGES

### 🏠 1. **Home.jsx**

**Purpose:** Public landing page for quick shortening

**Features:**

* Input for long URL and optional custom slug
* Button → Generate short link
* Displays generated short URL + QR code
* “Login to view analytics” message if not logged in

---

### 🔑 2. **Login.jsx**

**Purpose:** User authentication

**Features:**

* Form fields: Email, Password
* On submit → `POST /api/auth/login`
* Save JWT token to localStorage
* Redirect to `/dashboard`

---

### 📝 3. **Register.jsx**

**Purpose:** New user registration

**Features:**

* Form fields: Email, Password, Confirm Password
* On submit → `POST /api/auth/register`
* Show success or error message
* Redirect to `/login`

---

### 📋 4. **Dashboard.jsx**

**Purpose:** Display all links for the logged-in user

**Features:**

* Fetch from `GET /api/links`
* Show list/table of links with:

  * Short URL
  * Original URL
  * Click count
  * Expiry date
  * Created at
* Buttons:

  * “+ Create New Link” → open `CreateLinkForm` modal
  * “View Analytics” → `/link/:id`
  * “Delete” → `DELETE /api/links/:id`

---

### 📊 5. **LinkDetails.jsx**

**Purpose:** Detailed analytics for a short link

**Features:**

* Fetch analytics via:

  * `GET /api/analytics/:id`
  * `GET /api/analytics/:id/daily`
* Show:

  * Line chart (clicks over time)
  * Pie chart (device breakdown)
  * Referrer table (top 10)
  * QR code preview
  * Short URL copy button
  * Expiry info

---

## 🧩 COMPONENTS

### 🧭 **Navbar.jsx**

* Shows logo + nav links
* If logged in → Dashboard, Logout
* If not logged in → Login, Register

---

### ➕ **CreateLinkForm.jsx**

* Fields:

  * Target URL
  * Custom slug (optional)
  * Expiry date (optional)
* On submit → `POST /api/links`
* Displays generated short URL + QR code after creation

---

### 🪪 **LinkCard.jsx**

* Displays each link inside Dashboard
* Shows stats (clicks, expiry, date)
* Buttons for analytics, QR, delete

---

### 📈 **AnalyticsChart.jsx**

* Uses **Recharts LineChart**
* Displays clicks over time

---

### 🥧 **DevicePieChart.jsx**

* Uses **Recharts PieChart**
* Shows breakdown of devices (Mobile, Desktop, Tablet)

---

### 🔳 **QRModal.jsx**

* Modal that shows the QR code of a link
* Option to download QR as image

---

### 🔐 **ProtectedRoute.jsx**

* Wraps around private routes
* Checks if user token exists
* Redirects to `/login` if not authenticated

---

## 🧠 CONTEXT & HOOKS

### 🧩 **AuthContext.jsx**

* Provides global state for authentication
* Stores user info + token
* Handles login/logout
* Syncs with `localStorage`

---

### ⚙️ **useAuth.js**

* Custom hook to access auth state easily:

  ```js
  const { user, login, logout } = useAuth();
  ```

---

## 🔧 UTILITIES

### 🌐 **api.js**

* Axios instance setup with:

  * Base URL (`process.env.VITE_API_URL`)
  * Interceptor to attach JWT token to headers
  * Handles 401 errors globally

---

## 🎨 TAILWIND SETUP

* `index.css` includes Tailwind base, components, and utilities
* Common classes used:

  * `bg-gray-100`, `text-gray-800`, `rounded-xl`, `shadow-md`
  * Reusable button styles like:

    ```html
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Create</button>
    ```

---

## 🔚 FRONTEND SUMMARY CHECKLIST

✅ **Pages:**
☑️ Home
☑️ Login
☑️ Register
☑️ Dashboard
☑️ LinkDetails

✅ **Components:**
☑️ Navbar
☑️ CreateLinkForm
☑️ LinkCard
☑️ AnalyticsChart
☑️ DevicePieChart
☑️ QRModal
☑️ ProtectedRoute

✅ **Logic:**
☑️ JWT-based AuthContext
☑️ Axios API setup
☑️ Recharts for visual analytics
☑️ Tailwind for styling


