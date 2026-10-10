# 🎓 HIET Campus Mart
> **CodeArambh 2.0 Hackathon Project** | Hi-Tech Institute of Engineering and Technology (HIET), Ghaziabad  
> *Buy. Sell. Order. All on Campus.*

![HIET Campus Mart](https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80)

---

## 📌 Project Overview
**HIET Campus Mart** is a unified, offline-first campus commerce web app tailored for the students and staff of **Hi-Tech Institute of Engineering and Technology (HIET), Ghaziabad**. 

It eliminates long cafeteria queues, connects hostellers and day-scholars for second-hand textbook and gear trading, and provides digital pre-ordering for lab manuals and urgent exam printouts.

---

## ⚡ Tech Stack
- **Framework:** React 18 + Vite (lightning-fast development and build)
- **Styling:** Tailwind CSS (custom glassmorphism, animated gradients, responsive layout)
- **Routing:** React Router v6
- **Icons:** `lucide-react`
- **Effects:** `canvas-confetti` (for celebratory order confirmations)
- **State & Data Layer:** React Context API with persistent `localStorage` data layer (cleanly separated so it can be swapped for Supabase/Firebase in the future without changing UI components)

---

## 🚀 Quick Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone or navigate to the project directory
```bash
cd hiet-campus-mart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser and visit: **`http://localhost:5173`**

### 4. Build for production (optional)
```bash
npm run build
npm run preview
```

---

## ✨ Core Features & Highlights

### 1. 🛍️ Student Marketplace (Buy & Sell Used Items)
- **Card Grid:** Shows photos, title, price, savings discount, category, condition, seller avatar, hostel location, and relative time posted.
- **Campus Categories:** Calculators, Bicycles, Study Lamps, Books, Electronics, Hostel Essentials, and Others.
- **Search & Filters:** Real-time search, category chips, condition dropdown (*Brand New, Like New, Good, Fair*), and price sorting (*Low-to-High, High-to-Low, Newest*).
- **"Sell an Item" Form:** Live side-by-side card preview, Base64 image file upload, quick photo presets, price validation, and hostel room number.
- **Item Detail Page:** High-res image view, savings breakdown, verified student badge, **Direct WhatsApp Chat button (`wa.me`)**, and **"Request to Buy" offer modal**.
- **"My Listings" Page:** Filter by Active vs Sold listings, edit title/price/description, delete, and 1-click **Mark as Sold**.

### 2. 🍳 Canteen Online Ordering
- **Menu Items:** Samosa (2 pcs), Kulhad Masala Chai, Chole Bhature, Double Masala Maggi with Cheese, Deluxe Student Thali, Hakka Noodles, Cold Coffee, and more.
- **Veg / Non-Veg Indicator:** Green/Red food tags + "Pure Veg Only" switch.
- **Cart Controls:** In-place quantity increment/decrement (`+` / `-`).
- **Special Instructions:** Add notes like *"extra spicy"*, *"less sugar"*, *"pack separately"*.
- **Pickup Time Slots:** 10-minute pickup slot generator (*e.g., 12:10 PM - 12:20 PM*) to prevent queue congestion.
- **Confetti Celebration:** Joyful order placement with order receipt and Pickup Token (*e.g., `#A-42`*).
- **Live Status Tracker:** 4-step real-time progress tracker (*Placed ➔ Preparing ➔ Ready ➔ Collected*).

### 3. 📚 Stationery & Xerox Ordering
- **Academic Essentials:** Official HIET Practical Lab Record files, A2 Engineering Graphics sheets, Pentonic gel pens, Camlin geometry box, assignment sheets, and drawing tools.
- **Skip The Line Printouts:** Pre-pay for B&W and Color xerox tokens online and pick up printed files in 2 minutes.
- **Unified Cart:** Automatically groups Canteen and Stationery items with separate subtotal summaries.

### 4. 📊 Vendor & Staff Live Terminal (`/vendor`)
- **Real-Time Staff Control:** Canteen & Stationery staff can view all incoming orders live.
- **One-Click Status Stepper:** Move orders from *Placed ➔ Start Preparing ➔ Mark Ready for Pickup ➔ Mark Collected*.
- **Syncs With Student View:** When the vendor changes status, the student's order tracker updates immediately.
- **Live Business Metrics:** Today's Total Revenue (₹), Pending Orders in Kitchen, Total Completed Orders.
- **Filters & Search:** Filter by shop, filter by status, and search by student name or Token Number.

### 5. 🔐 Auth & 1-Click Judge Demo Switcher
- Mock SSO authentication supporting Hostellers and Day-Scholars with college email format (`@hiet.org`).
- **1-Click Demo Profiles:** In the navbar or modal, switch between:
  - 👨‍🎓 **Aarav Sharma** (Hosteller, Raman Hostel Block B)
  - 👩‍🎓 **Priya Patel** (Day Scholar, Bus Route #4)
  - 🍳 **Ramesh Bhaiya** (HIET Central Canteen Vendor)
  - 📚 **Gupta Ji** (Campus Stationery Vendor)

### 6. 🎨 Aesthetic Design & Theme
- Deep Indigo (`#4F46E5`), Violet (`#7C3AED`), Cyan (`#06B6D4`), and Warm Orange (`#F97316`) palette.
- Modern glassmorphism cards (`backdrop-blur`, subtle borders, soft shadows).
- Full **Dark Mode** toggle with persistence in `localStorage`.
- **Reset Demo Data Button:** One-click reset in the footer to restore initial seed data anytime during hackathon judging.

---

## ⏱️ 2-Minute Judge Demo Script

| Time | Step | What to show & say |
|---|---|---|
| **0:00 - 0:25** | **Hero & Vision** | Open the homepage. *"Hello judges! We built HIET Campus Mart for CodeArambh 2.0. In colleges like HIET, seniors dump cycles and calculators in scrap, while 1st years buy new ones at full price. Also, our canteen has 20-minute rush lines between lectures. HIET Campus Mart solves both."* |
| **0:25 - 0:50** | **Marketplace & Sell Form** | Click **Marketplace**. Filter by *Calculators*, sort by price. Click on *Casio fx-991ES*. Show the *WhatsApp Direct Chat* link and hostel room info. Click **Sell an Item**, type a title and pick a preset photo to demonstrate the **live side-by-side preview**. |
| **0:50 - 1:20** | **Canteen & 10-Min Pickup Slot** | Go to **Canteen**. Add *Double Masala Maggi* and *Kulhad Chai*. Type special instruction *"Less sugar"*. Go to Cart. Select the **10-minute pickup slot** (*e.g., 12:20 PM - 12:30 PM*). Click **Confirm Order** — confetti fires! Show the order receipt and **Token #C-42**. |
| **1:20 - 1:45** | **Vendor Terminal Real-Time Sync** | In the navbar, click **Vendor Dashboard** (or switch to Ramesh Bhaiya). Point to the live order that was just created. Click **"Start Preparing"** then **"Mark Ready for Pickup"**. Now click **My Orders** in another tab / view — show that the status badge and stepper updated to **Ready** in real-time! |
| **1:45 - 2:00** | **Dark Mode & Reset** | Toggle Dark Mode to showcase the sleek glassmorphism UI. Scroll to the footer and highlight the **"Reset Demo Data"** button and team credits. |

---

## 🔮 5 Future Scope Ideas (Phase 2 Roadmap)

1. **UPI / Campus Wallet Payment Gateway Integration:**
   - Integrate Razorpay or Cashfree with UPI QR code deep-links, plus an RFID Student ID card tap-to-pay wallet for instant cashless campus checkout.
2. **College Email OTP & AKTU Roll Number Verification:**
   - Enforce authentic domain signup via `@hiet.org` OTP verification and AKTU ERP student database linking to verify genuine enrolled students.
3. **AI-Powered Fair Price Estimator & Smart Tagging:**
   - Use Gemini Vision to let students snap a picture of their textbook or bicycle; the AI automatically recognizes the model, assesses condition, and recommends fair resale market pricing.
4. **Peer Hostel Runners ("Room-to-Room" Delivery):**
   - Enable an opt-in campus gig economy where students walking back from the canteen can earn ₹15-₹20 by delivering food packets directly to Raman or Kalam hostel rooms.
5. **Student Trust & Rating System:**
   - Reputation scoring based on verified completed transactions, punctuality during meetups, and seller badges (*"Top Senior Contributor"*, *"Fast Responder"*).

---

## 📁 Project Architecture & Clean Folder Structure

```
hiet-campus-mart/
├── index.html                   # HTML entry point with Plus Jakarta Sans & Inter fonts
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme, brand colors, shadows & animations
├── vite.config.js               # Vite config with React plugin
├── src/
│   ├── main.jsx                 # React root rendering
│   ├── App.jsx                  # React Router routes and context providers
│   ├── index.css                # Tailwind directives & glassmorphism utilities
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Sticky nav with cart counter & demo switcher
│   │   ├── Footer.jsx           # Team credits, college address & reset trigger
│   │   ├── Hero.jsx             # Gradient animated hero with quick search
│   │   ├── QuickAccessTiles.jsx # 3 feature showcase cards
│   │   ├── ItemCard.jsx         # Marketplace item card with discount calculations
│   │   ├── FoodItemCard.jsx     # Food/Stationery card with veg tag & quantity stepper
│   │   ├── StatusBadge.jsx      # Colored status badges (Placed, Preparing, Ready, Collected)
│   │   ├── LiveOrderTracker.jsx # 4-step progress stepper
│   │   ├── AuthModal.jsx        # Login/Signup modal with 1-click judge presets
│   │   └── ResetConfirmModal.jsx# Factory reset demo confirmation
│   ├── context/                 # State management layer
│   │   ├── AuthContext.jsx      # Current user, login, signup, demo profile switcher
│   │   ├── MarketplaceContext.jsx# Products state, add, edit, delete, mark sold
│   │   ├── CartContext.jsx      # Grouped cart (canteen/stationery), quantity controls
│   │   ├── OrderContext.jsx     # Orders, live status progression, revenue stats
│   │   ├── ThemeContext.jsx     # Dark mode / light mode toggle
│   │   └── ToastContext.jsx     # Animated toast notifications
│   ├── data/
│   │   └── seedData.js          # Realistic HIET college seed data (14+ marketplace, 14+ food, 12+ stationery, 4+ orders)
│   └── utils/
│       ├── formatters.js        # Currency (₹), relative timeAgo, 10-min pickup slots
│       └── storage.js           # Safe localStorage wrapper
```

---

## 🏆 CodeArambh 2.0 Presentation Notes
- **Why LocalStorage first?**  
  In a 24-hour hackathon environment, network failures or external DB rate limits during judging can break live demos. By designing a clean, abstracted data layer over `localStorage`, the app works 100% reliably offline and can be connected to Firebase or Supabase with a simple 10-line adapter swap.
- **Zero Placeholder TODOs:**  
  Every button, filter, quantity modifier, status advance, and link is fully wired and functional.

---
*Created for CodeArambh 2.0 at Hi-Tech Institute of Engineering and Technology (HIET), Ghaziabad.*
