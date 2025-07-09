# 🧵 DripLab – Custom Streetwear E-Commerce

DripLab is a modern, scalable, full-featured e-commerce platform for streetwear lovers. Customers can browse collections like T-shirts, hoodies, bracelets, and rings — or unleash creativity with fully customizable designs.

## 📦 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Redux Toolkit (RTK Query)
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Architecture:** Clean Architecture
- **Authentication:** JWT, bcrypt
- **Storage:** Cloudinary (for user-uploaded designs)
- **Admin Tools:** Recharts, protected admin panel

---

## ✨ Features

### 🛍️ User Side

- Browse and search across categories (T-shirts, Hoodies, etc.)
- Add to cart and checkout
- Register/Login with JWT Auth
- View order history
- Upload or create custom T-shirt designs

### 🛠️ Admin Side

- Dashboard analytics
- Create/Edit/Delete products
- Manage categories, offers, and coupons
- Block or manage users
- View and manage all orders
- Change homepage banners

---

## 📁 Project Structure

```
DripLab/
├── client/       # Customer frontend
├── admin/        # Admin dashboard frontend
├── server/       # Backend API (Clean Architecture)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/DripLab.git
cd DripLab
```

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
cd ../admin && npm install
```

### 3. Start development servers
- Backend: `cd server && npm run dev`
- Client: `cd client && npm run dev`
- Admin: `cd admin && npm run dev`

---

## 📌 License

MIT License. Feel free to use and modify DripLab for your own startup or personal brand.

---

> Designed & Engineered with 💧 by [Sidharth_Sundaran]
