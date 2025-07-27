# 🎬 Movie Ticket Booking Platform

A full-stack Movie Ticket Booking Platform built using **Spring Boot**, **React**, **Razorpay**, and **AWS S3**. This system supports three distinct roles: **Admin**, **Theatre Owner**, and **User**.


## 🧩 Features

### 👥 Role-Based Access

* **Admin**

  * Manage users, theatre owners, movies, and screens
  * View payment reports and overall system activity
* **Theatre Owner**

  * Create and manage theatres, screens, and movie shows
  * Monitor bookings and revenue
* **User**

  * Browse movies by location and date
  * View available seats and book tickets
  * Make payments securely via Razorpay

### 💳 Razorpay Integration

* Razorpay used for secure online ticket payments.
* Payment history and status tracked for each transaction.

### ☁️ AWS S3 Integration

* Movie posters and theatre-related images are stored and served from AWS S3 for scalable and efficient media management.

### 🪑 Seat Booking & Management

* Real-time seat status updates (booked/available)
* Block seats temporarily during payment (can be extended with WebSockets)

---

## ⚙️ Tech Stack

### Backend

* Java + Spring Boot
* JPA/Hibernate
* MySQL Database

### Frontend

* React.js
* Redux Toolkit for state management
* Axios for API calls
* Bootstrap & Custom CSS for styling

### DevOps & Cloud

* AWS S3 (media storage)
* Razorpay (payment gateway)
* GitHub (version control)
* Maven (build tool)

---

## 📦 Folder Structure Overview

```
backend/
├── src/main/java/com/ramakrishna/moviebooking/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── repositories/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── utils/
```

## 📌 Future Enhancements

* 📱 Mobile responsiveness
* 📊 Analytics dashboard for admins
* 📧 Email ticket confirmation

## 🧑‍💻 Author

**Mandalaneni Sai Balaji Siva Rama Krishna**
📧 [sivaramm683@gmail.com](mailto:sivaramm683@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/siva-rama-krishna-mandalaneni)
