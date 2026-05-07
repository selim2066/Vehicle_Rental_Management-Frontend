<div align="center">

#  Vroom — Premium Vehicle Rental Platform

**A full-stack vehicle rental management system with real-time booking, admin dashboard, and luxury fleet browsing.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vehicle--rental--management--frontend.vercel.app-black?style=for-the-badge&logo=vercel)](https://vehicle-rental-management-frontend.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Vroom Banner](https://vehicle-rental-management-frontend.vercel.app/og-image.jpg)

</div>

---

## 📋 Table of Contents
<div classname="flex">
- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Pages & Routes](#-pages--routes)
- [Backend Repository](#-backend-repository)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
    
</div>


---

## 🌟 Overview

**Vroom** is a modern, full-stack vehicle rental management platform built with Next.js 16 and React 19. It provides a seamless experience for customers to browse, filter, and book premium vehicles — and for admins to manage the entire fleet, bookings, and user base from a dedicated dashboard.

The application follows a clean service-layer architecture on the frontend, communicating with a RESTful Express + Prisma backend deployed on Render, backed by a NeonDB (PostgreSQL) database.

---

## 🔗 Live Demo

> **Frontend:** [https://vehicle-rental-management-frontend.vercel.app](https://vehicle-rental-management-frontend.vercel.app)
>
> **Backend API:** [https://vehiclerentalmanagement-production.up.railway.app/api/v1](https://vehiclerentalmanagement-production.up.railway.app/api/v1)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@vroom.com | admin123 |
| Customer | customer@vroom.com | customer123 |

> ⚠️ These are demo credentials. Please do not change passwords.

---

## ✨ Features

### Customer
- 🔐 **Authentication** — Secure JWT-based sign up, sign in, and session persistence
- 🚘 **Vehicle Browsing** — Filter and search across the full fleet by type, fuel, transmission, and availability
- 📅 **Booking System** — Date-range booking with automatic price calculation and availability checks
- ⭐ **Reviews** — Submit and view star ratings and comments per vehicle (one review per booking)
- 📦 **My Bookings** — View booking history, statuses (active / completed / cancelled), and details
- 👤 **Profile Management** — Update personal info, avatar, bio, and address
- 📬 **Newsletter** — Subscribe to updates directly from the homepage

### Admin
- 📊 **Analytics Dashboard** — Key metrics including total revenue, bookings, users, and vehicle stats
- 🚗 **Fleet Management** — Add, edit, and remove vehicles with images, features, and full specs
- 📋 **Booking Management** — View and update the status of all customer bookings
- 👥 **User Management** — View all registered users and their roles

### UI/UX
- 🌙 **Dark / Light Mode** — System-aware theming powered by `next-themes`
- 🎬 **Smooth Animations** — Page transitions and scroll animations via Framer Motion & GSAP
- 🖱️ **Custom Scrollbar** — Branded car-themed scroll indicator
- 📱 **Fully Responsive** — Mobile-first design with a collapsible sidebar on dashboard
- 🔔 **Toast Notifications** — Real-time feedback using Sonner

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), [GSAP 3](https://gsap.com/) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Geist](https://vercel.com/font) + Outfit (Google Fonts) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **HTTP Client** | Native `fetch` API |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/
│   │   ├── signin/             # Sign in page
│   │   └── signup/             # Sign up page
│   ├── dashboard/              # Protected dashboard (customer + admin)
│   │   ├── admin/bookings/     # Admin: all bookings management
│   │   ├── analytics/          # Admin: analytics & charts
│   │   ├── vehicles/           # Admin: fleet management + add vehicle
│   │   ├── users/              # Admin: user management
│   │   ├── bookings/           # Customer: my bookings
│   │   ├── profile/            # User profile settings
│   │   └── settings/           # Account settings
│   ├── vehicles/
│   │   ├── page.tsx            # Vehicle listing with filters
│   │   └── [id]/               # Vehicle detail + booking form
│   ├── bookings/
│   │   └── [id]/               # Booking detail page
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── deals/                  # Deals page
│   ├── how-it-works/           # How it works page
│   ├── booking-success/        # Post-booking confirmation
│   └── page.tsx                # Landing page (SSR)
│
├── components/
│   ├── ui/                     # Reusable base UI primitives
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Landing page sections (Hero, FAQ, etc.)
│   ├── vehicles/               # Vehicle cards, filters, gallery, reviews
│   ├── dashboard/              # Dashboard sidebar
│   └── providers/              # Auth, Theme, Smooth Scroll providers
│
├── services/                   # API service layer (one file per domain)
│   ├── auth.service.ts
│   ├── vehicle.service.ts
│   ├── booking.service.ts
│   ├── user.service.ts
│   └── review.service.ts
│
├── hooks/                      # Custom React hooks
│   └── use-debounce.ts
│
├── types/
│   └── index.ts                # Global TypeScript interfaces
│
└── lib/
    └── utils.ts                # Shared utility functions (cn, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x or [yarn](https://yarnpkg.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/vehicle-rental-frontend.git
cd vehicle-rental-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Then fill in the values as described in the [Environment Variables](#-environment-variables) section.

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```dotenv
# Backend API base URL
# Use the production URL for the deployed backend, or localhost for local development
NEXT_PUBLIC_API_URL=https://vehiclerentalmanagement-production.up.railway.app/api/v1
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

> **Note:** All frontend environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server (after build) |
| `npm run lint` | Run ESLint across the codebase |

---

## 🗺 Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with featured fleet |
| `/vehicles` | Public | Full vehicle listing with filters |
| `/vehicles/[id]` | Public | Vehicle detail, gallery, reviews & booking form |
| `/signin` | Guest only | User sign in |
| `/signup` | Guest only | New account registration |
| `/bookings/[id]` | Auth | Booking detail view |
| `/booking-success` | Auth | Post-booking confirmation page |
| `/dashboard` | Auth | User/Admin dashboard home |
| `/dashboard/profile` | Auth | Edit profile info and avatar |
| `/dashboard/settings` | Auth | Account settings |
| `/dashboard/bookings` | Customer | View personal booking history |
| `/dashboard/analytics` | Admin | Revenue, booking, and fleet analytics |
| `/dashboard/vehicles` | Admin | Manage vehicle fleet |
| `/dashboard/vehicles/add` | Admin | Add a new vehicle |
| `/dashboard/admin/bookings` | Admin | Manage all customer bookings |
| `/dashboard/users` | Admin | View and manage users |
| `/about` | Public | About the platform |
| `/contact` | Public | Contact page |
| `/deals` | Public | Deals and offers |
| `/how-it-works` | Public | Platform guide |

---

## 🔗 Backend Repository

The backend for this project is a separate Node.js + Express + Prisma REST API.

> 📦 **Backend Repo:** [Vehicle Rental Management — Backend](https://github.com/your-username/vehicle-rental-backend)
>
> The backend is deployed on **Render** with a **NeonDB** (PostgreSQL) database.

**Backend tech stack at a glance:**

- Node.js + Express + TypeScript
- Prisma ORM with PostgreSQL (NeonDB)
- JWT authentication with refresh token rotation
- Modular MVC architecture (routes → controllers → services)

---

## 🌐 Deployment

This frontend is deployed on **Vercel**. To deploy your own instance:

**1. Push your code to GitHub**

**2. Import the repository on [vercel.com](https://vercel.com)**

**3. Add your environment variable in Vercel's project settings:**

| Key | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your backend API URL |

**4. Click Deploy** — Vercel auto-detects Next.js and configures everything.

Every push to the `main` branch will trigger an automatic redeployment.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style and component patterns.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made by Md Selim Reza

**[⬆ Back to top](#-vroom--premium-vehicle-rental-platform)**

</div>
