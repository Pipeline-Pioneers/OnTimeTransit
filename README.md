OnTimeTransit
OnTimeTransit is a full-stack Bus Management System designed to simplify travel with seamless route, schedule, and ticket management. The project uses a microservices architecture for backend services and a modern React frontend.

Features
User and Admin authentication
Route management (add, update, view routes)
Bus schedule management
Ticket booking and management
Analytics and notifications
Role-based dashboards for Admin and Users
Tech Stack
Frontend: React, React Router, Framer Motion, React Toastify
Backend: Java (Spring Boot microservices)
User Service
Route Service
Schedule Service
Ticket Service
Analytics Service
Notification Service
Database: (Configured per service, see SQL session files)
Containerization: Docker, Docker Compose
Project Structure
Getting Started
Prerequisites
Node.js & npm
Java 17+ (for Spring Boot)
Docker & Docker Compose
Setup
Clone the repository:

Start backend services:

Start frontend:

Access the app:

Frontend: http://localhost:3000
Backend services: See individual service ports in docker-compose.yml
Usage
Register as a user or login as admin/user.
Admins can manage routes, schedules, and tickets.
Users can view routes, book tickets, and manage their bookings.
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -am 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request
License
MIT
