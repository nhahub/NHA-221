# 🌟 Mentoring Platform — MERN Full-Stack Application

A **powerful and scalable mentoring platform** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. This platform connects **mentees** with **expert mentors** through smooth booking, secure authentication, structured availability, and automated Google Meet creation using the **Google Calendar API**.

🔗 **Live Demo:** [https://mentoring-platform-topaz.vercel.app/](https://mentoring-platform-topaz.vercel.app/)

---

## ✨ Features

### 👤 Mentor & User Profiles

- Full mentor details: expertise tags, pricing, experience, and availability
- Easy profile management for mentors and users

### 🗓️ Smart Booking System

- Book sessions directly from mentor profiles
- Real-time slot validation to prevent double bookings

### 📅 Google Calendar Integration

- Auto-creates Google Meet events when a session is booked
- Sends structured meeting details to both mentor and user

### 🔐 Secure Authentication

- JWT-based login and role-based access control
- Separate dashboards tailored to each user role

### 💻 Modern UI

- Fully responsive frontend built with React + Tailwind CSS
- Reusable, modular component structure

### 📊 Interactive Dashboards

- Mentors: manage availability, bookings, and profile
- Users: track upcoming, past, and canceled mentoring sessions

### 💳 Payment-Ready Architecture

- Backend structured to support Stripe and future payment modules

---

## 👥 Team Members

Developed collaboratively by:

- **Mohamed Essam**
- **Abdelrhman Magdy**
- **Nouran Said**
- **Mostafa Gamal Eid**
- **Baher Mohamed**

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Integrations:** Google Calendar API
**Deployment:** Vercel

---

## 📌 Future Enhancements

Planned improvements include:

- Stripe payments for secure online transactions
- In-app chat between mentors and mentees
- AI-based mentor recommendations
- Email & push notification reminders
- Full admin control panel (users, mentors, platform content)
- Analytics & detailed reports for admins

---

# 📁 Project Structure

## 🖥️ Frontend Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── index.html
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Mentor/
│   │   ├── User/
│   │   ├── Dashboard/
│   │   └── Shared/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BookingContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useBooking.js
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Mentors/
│   │   ├── Users/
│   │   ├── MentorProfile/
│   │   ├── UserProfile/
│   │   ├── Booking/
│   │   ├── Auth/
│   │   └── Dashboard/
│   │
│   ├── redux/
│   │   ├── slices/
│   │   ├── store.js
│   │   └── actions.js
│   │
│   ├── router/
│   │   └── AppRouter.jsx
│   │
│   └── services/
│       ├── authService.js
│       ├── mentorService.js
│       ├── userService.js
│       ├── bookingService.js
│       └── googleCalendarService.js
│
├── package.json
└── vite.config.js
```

---

## 🧩 Backend Structure

```
backend/
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── mentor.controller.js
│   ├── user.controller.js
│   ├── booking.controller.js
│   └── googleCalendar.controller.js
│
├── models/
│   ├── User.js
│   ├── Mentor.js
│   ├── Booking.js
│   └── Availability.js
│
├── routes/
│   ├── auth.routes.js
│   ├── mentor.routes.js
│   ├── user.routes.js
│   ├── booking.routes.js
│   └── googleCalendar.routes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── utils/
│   ├── sendEmail.js
│   └── googleCalendar.js
│
├── server.js
└── package.json
```
