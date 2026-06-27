# Backend Architecture

# PyMasterClass

Version 1.0

Backend Stack

* PHP 8.3+
* PDO
* MySQL 8
* Apache / Nginx
* Composer
* JWT Authentication
* REST API
* MVC + Service Layer
* Repository Pattern

---

# Architecture

```
Browser
      │
      ▼
API Router
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
PDO Database
```

Business Logic hanya boleh berada pada Service.

Controller tidak boleh mengakses Database secara langsung.

---

# Folder Structure

```
backend/

app/

Controllers/

AuthController.php

CourseController.php

LessonController.php

MissionController.php

QuizController.php

ProjectController.php

ProfileController.php

PaymentController.php

CertificateController.php

DashboardController.php

AdminController.php

AnalyticsController.php

Services/

AuthService.php

CourseService.php

LessonService.php

MissionService.php

QuizService.php

ProjectService.php

PaymentService.php

CertificateService.php

DashboardService.php

AIService.php

Repositories/

UserRepository.php

CourseRepository.php

MissionRepository.php

LessonRepository.php

QuizRepository.php

ProjectRepository.php

PaymentRepository.php

CertificateRepository.php

AnalyticsRepository.php

Models/

User.php

Course.php

Mission.php

Lesson.php

Quiz.php

Project.php

Payment.php

Certificate.php

Core/

App.php

Router.php

Controller.php

Database.php

Request.php

Response.php

Session.php

Validator.php

Middleware.php

JWT.php

Config/

config.php

database.php

jwt.php

mail.php

Storage/

Uploads/

Certificates/

Projects/

Slides/

Avatar/

Logs/

Public/

index.php

Assets/

Routes/

api.php

web.php

Middleware/

AuthMiddleware.php

AdminMiddleware.php

PremiumMiddleware.php

RateLimitMiddleware.php

CSRFMiddleware.php

Vendor/

composer

.env
```

---

# Authentication

JWT Token

Access Token

Refresh Token

Remember Login

Email Verification

Forgot Password

Reset Password

Google Login (Future)

---

# User Role

Guest

Student

Instructor

Admin

Super Admin

Role menggunakan Middleware.

---

# REST API Structure

```
POST

/api/auth/login

POST

/api/auth/register

POST

/api/auth/logout

POST

/api/auth/refresh

GET

/api/profile

PUT

/api/profile

GET

/api/dashboard

GET

/api/courses

GET

/api/course/{slug}

GET

/api/mission/{id}

GET

/api/lesson/{id}

POST

/api/quiz/submit

POST

/api/project/upload

GET

/api/certificate

POST

/api/payment

GET

/api/analytics
```

Semua API menggunakan JSON.

---

# Response Standard

Success

```
{
    "success": true,
    "message": "...",
    "data": {}
}
```

Error

```
{
    "success": false,
    "message": "...",
    "errors": []
}
```

---

# Database Connection

PDO Singleton

Persistent Connection

UTF8MB4

Prepared Statement

Transaction

Rollback

Commit

---

# Security

PDO Prepared Statement

CSRF Token

XSS Filter

Input Validation

Password Hash

JWT

Rate Limiter

Session Regeneration

File Upload Validation

MIME Validation

Image Compression

Captcha

Email Verification

Login Attempt Limit

CORS

Secure Headers

HTTPS Only

---

# Cache

Course Cache

Lesson Cache

Dashboard Cache

Statistics Cache

Session Cache

---

# Upload System

Avatar

Slide Thumbnail

Project Thumbnail

Certificate

PDF

Image

Video (Optional)

Semua file diberi nama UUID.

---

# Logging

Login

Register

Payment

Certificate

Admin Activity

API Error

System Error

Database Error

Audit Trail

---

# Notification

Email

Dashboard Notification

System Announcement

Course Update

Payment Success

Certificate Ready

---

# Learning Progress

Progress dihitung otomatis.

Formula

```
Slide

20%

Practice

20%

Quiz

20%

Challenge

20%

Mini Project

20%
```

Jika Progress 100%

Mission Unlock

---

# Payment Module

Checkout

Coupon

Voucher

Invoice

Payment Verification

Order History

Refund (Future)

---

# AI Module

AI Prompt

AI Tutor

AI Hint

AI Quiz Generator

AI Code Review (Future)

Semua Prompt tersimpan di Database.

---

# Certificate Engine

Generate PDF

QR Verification

Unique Certificate Number

Download

Share

---

# Admin Module

Dashboard

User

Course

Mission

Lesson

Quiz

Project

Certificate

Analytics

Revenue

Announcement

Prompt AI

Settings

---

# Analytics

Student Active

Course Popularity

Mission Completion

Quiz Score

Revenue

Retention

Traffic

Conversion

---

# Database Naming Convention

tbl_users

tbl_courses

tbl_missions

tbl_lessons

tbl_slides

tbl_quizzes

tbl_questions

tbl_projects

tbl_progress

tbl_certificates

tbl_payments

tbl_transactions

tbl_notifications

tbl_logs

tbl_settings

---

# API Version

```
/api/v1/
/api/v2/
```

---

# Performance

Database Index

Pagination

Lazy Loading

Caching

Compression

Image Optimization

Minified JSON

Gzip

---

# Coding Standard

PSR-12

CamelCase Method

PascalCase Class

snake_case Database

UUID Primary Key

Strict Type

Dependency Injection

Repository Pattern

Service Layer

Single Responsibility Principle

DRY

KISS

SOLID
