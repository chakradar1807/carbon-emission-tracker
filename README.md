# 🌱 Carbon Emission Tracking System

A modern full-stack DBMS project developed to monitor, analyze, and manage carbon emissions generated from user activities. The system helps track environmental impact using real-time emission analysis and interactive dashboards.

---

## 🚀 Features

- 👤 User Management
- 🚗 Activity Tracking
- 🌍 CO₂ Emission Monitoring
- 📊 Interactive Dashboard
- 📈 Emission Reports & Analytics
- ⚠️ Safe / Warning / Failed Emission Status
- 🔐 Transaction Management
- 🔄 Concurrency Control
- 🧩 Normalized Relational Database
- 📉 Aggregate SQL Functions

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Tools
- Git & GitHub
- VS Code

---

## 🗄️ Database Design

The database is normalized into multiple tables:

- USER
- ACTIVITY
- EMISSION
- LOCATION
- ACTIVITY_TYPE

Relationships are maintained using:
- Primary Keys
- Foreign Keys
- JOIN Operations

---

## 📌 SQL Concepts Implemented

- SELECT Queries
- INNER JOIN & LEFT JOIN
- GROUP BY
- HAVING
- Aggregate Functions:
  - SUM()
  - AVG()
  - COUNT()
  - MAX()
  - MIN()
- Transactions
- Concurrency Control
- Constraints
- Normalization (up to 3NF)

---

## 📊 Emission Classification

| CO₂ Value | Status |
|----------|---------|
| ≤ 4      | ✅ Safe |
| 4 - 6    | ⚠️ Warning |
| > 6      | ❌ Failed |

---

## ⚡ Dashboard Features

- Total Users
- Total Activities
- Total CO₂ Emission
- Emission Graph Visualization
- Failed Vehicle Detection

---

## 🔐 Transaction Management

The project uses transactions to ensure:
- Atomicity
- Consistency
- Isolation
- Durability (ACID Properties)

---

## 🔄 Concurrency Control

Implemented concurrency concepts to handle:
- Multi-user access
- Data consistency
- Isolation levels

---

## 📷 Project Screenshots

### Dashboard
(Add screenshot here)

### Users Page
(Add screenshot here)

### Reports Page
(Add screenshot here)

---

## ▶️ How to Run the Project

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

Open:
```text
frontend/dashboard.html
```

in browser.

---

## 👨‍💻 Developed By

### Chakradar MP
B.Tech – 2nd Year

---

## 🌍 Project Objective

This project aims to create awareness about environmental pollution by tracking carbon emissions generated through daily activities and providing analytical insights using database technologies.

---

## 📜 License

This project is developed for educational and academic purposes.
