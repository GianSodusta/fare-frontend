# 🛺 TrikeFare v2.0

**Official Tricycle Fare Calculator — City of Koronadal, South Cotabato, Philippines**

---

## 📁 Project Structure

```
trikefare/
├── server.js          # Node.js Express backend
├── package.json
├── .env               # Environment variables (create this)
└── src/               # Frontend
    ├── style.css       # Shared design system
    ├── utils.js        # Shared JS utilities
    ├── index.html      # Login page
    ├── home.html       # Map + fare calculator
    ├── admin.html      # Admin dashboard
    ├── fare-settings.html
    ├── user-management.html
    ├── trip_history.html
    ├── settings.html
    ├── about.html
    ├── request-otp.html
    ├── verify-otp.html
    └── img/            # Images/icons
```

---

## 🚀 Setup

### 1. Backend

```bash
cd trikefare
npm install
```

Create a `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=trikefare_db

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password

SESSION_SECRET=change-this-to-a-random-string
FRONTEND_URL=http://127.0.0.1:5500
```

Start server:
```bash
npm start         # production
npm run dev       # development (auto-restart)
```

### 2. Database

Create MySQL database:
```sql
CREATE DATABASE trikefare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Tables are created automatically on first run.

### 3. Frontend

Open `src/index.html` in a browser, or serve with VS Code Live Server on port 5500.

---

## 🔐 Admin Login

- Email: `tricyclefareadmin@gmail.com`
- Password: `admin123`

**⚠️ Change the admin password before deploying to production!**

---

## 🗺️ Fare Calculation Logic

| Trip Type | Calculation |
|-----------|-------------|
| Inside → Inside base zone | Flat base fare |
| Inside ↔ Outside zone | Base fare + (distance × per_km rate) |
| Outside → Outside | Base fare + (distance × per_km rate) |

**Discounts** are subtracted from the calculated total:
- HS/College: configurable discount
- Elementary: configurable discount
- Daycare/Kinder: configurable discount

Default rates: Base ₱15 · Per km ₱2 · HS discount ₱3 · Elementary ₱5 · Kinder ₱7

---

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
4. Add your Client ID and Secret to `.env`

---

## 🛠️ Key Improvements in v2.0

- **Fixed**: Broken `fetch().then().then()` chain bug in login page
- **Fixed**: Admin routes now use proper `async/await` with error handling
- **Added**: Unified design system (`style.css`) — consistent UI across all pages
- **Added**: Shared utilities (`utils.js`) — toast notifications, sidebar, auth guard
- **Added**: Password strength meter on registration
- **Added**: OTP paste support (paste all 6 digits at once)
- **Added**: User search, filter and pagination in admin
- **Added**: Auto-redirect to verify page after OTP request
- **Added**: Auto sign-in after successful registration
- **Added**: Mini map previews in trip history
- **Added**: Live fare preview in fare settings
- **Added**: Database auto-reconnect on connection loss
- **Added**: Promisified DB queries (no callback hell)
- **Added**: Input validation on all forms
- **Added**: Responsive desktop sidenav for admin pages
- **Improved**: Geocoding now proxied through backend (no CORS issues)
