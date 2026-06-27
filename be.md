# PyMasterClass Backend Architecture

Version: 2.0

---

# Overview

Backend PyMasterClass dibangun menggunakan Next.js Fullstack sehingga Frontend dan Backend berada dalam satu repository.

Backend menggunakan Clean Architecture, Repository Pattern, Service Layer, Prisma ORM, PostgreSQL (Supabase), serta Server Actions dan Route Handlers.

Backend tidak menggunakan Express maupun NestJS.

---

# Technology Stack

Framework

- Next.js 15 (App Router)

Language

- TypeScript

Database

- PostgreSQL (Supabase)

ORM

- Prisma ORM

Authentication

- Supabase Auth

Validation

- Zod

File Storage

- Supabase Storage

Deployment

- Vercel

Documentation

- Markdown

---

# Architecture

```
Browser

↓

React Component

↓

Server Action

atau

API Route

↓

Middleware

↓

Validation (Zod)

↓

Service Layer

↓

Repository Layer

↓

Prisma ORM

↓

Supabase PostgreSQL
```

---

# Architecture Rules

Frontend tidak boleh mengakses database.

Frontend tidak boleh memanggil Prisma.

Semua query database melalui Repository.

Semua Business Logic melalui Service.

Semua validasi menggunakan Zod.

Semua upload melalui Supabase Storage.

Semua autentikasi menggunakan Supabase Auth.

---

# Layer

Presentation

↓

Application

↓

Domain

↓

Infrastructure

---

# Folder Structure

```
src/

app/

api/

(auth)

dashboard/

learning/

pricing/

admin/

components/

features/

hooks/

lib/

repositories/

services/

validators/

types/

middleware.ts

prisma/

public/
```

---

# Repository Pattern

Repository bertugas mengakses database.

Repository tidak memiliki Business Logic.

Contoh

```
UserRepository

CourseRepository

MissionRepository

LessonRepository

QuizRepository

ProjectRepository

ProgressRepository

PaymentRepository

CertificateRepository

NotificationRepository
```

---

# Service Layer

Service berisi seluruh Business Logic.

Contoh

```
AuthService

DashboardService

CourseService

MissionService

LessonService

QuizService

ProgressService

ProjectService

PaymentService

CertificateService

NotificationService
```

---

# Validation

Semua request divalidasi menggunakan Zod.

Contoh

```
Register

Login

Create Course

Update Lesson

Quiz Submission

Project Upload
```

---

# Authentication

Provider

Supabase Auth

Method

- Email Password

Future

- Google

- GitHub

- Microsoft

---

# Authorization

Role

Guest

Student

Instructor

Admin

Super Admin

---

# Permission Matrix

Guest

- Landing Page
- Login
- Register

Student

- Dashboard
- Learning
- Quiz
- Certificate

Instructor

- Course
- Mission
- Lesson

Admin

- Semua CRUD

Super Admin

- Semua fitur termasuk System Settings

---

# Middleware

Guest Middleware

↓

Auth Middleware

↓

Verified Middleware

↓

Role Middleware

↓

Permission Middleware

---

# Feature Modules

Authentication

Dashboard

Course

Category

Mission

Lesson

Slide

Practice

Quiz

Question

Answer

Project

Submission

Certificate

Progress

Notification

Payment

Analytics

Profile

Settings

Admin

AI Mentor

---

# API Strategy

Menggunakan kombinasi

Server Actions

dan

Route Handlers

Rule

GET

Route Handler

POST

Server Action

Upload

Route Handler

Webhook

Route Handler

---

# Error Handling

Semua Error menggunakan standar berikut

```
{
success:false,
message:"",
errors:[]
}
```

---

# Success Response

```
{
success:true,
message:"",
data:{}
}
```

---

# Logging

Semua aktivitas dicatat

Login

Logout

Register

Payment

Certificate

Project Upload

Admin Activity

System Error

---

# Upload

Storage

Supabase Storage

Bucket

avatars

course-thumbnail

lesson-thumbnail

project

certificate

public-assets

---

# Upload Rules

Max Image

5 MB

Format

jpg

jpeg

png

webp

PDF

20 MB

Generate UUID Filename

Compress Image

---

# Security

Supabase Auth

JWT

Secure Cookie

CSRF

Rate Limiter

Helmet Header

Zod Validation

RLS

Input Sanitization

SQL Injection Protection

XSS Protection

---

# Password Policy

Minimal

8 karakter

Harus mengandung

Huruf Besar

Huruf Kecil

Angka

Symbol

---

# Session

Managed by Supabase Auth

Auto Refresh

Persistent Login

Remember Me

Logout All Device (Future)

---

# Database Access

Semua query menggunakan Prisma.

Dilarang menggunakan SQL mentah kecuali benar-benar diperlukan.

---

# Caching

Dashboard

Course List

Landing Page

Category

Announcement

Statistics

---

# Notification

Dashboard Notification

Email

Achievement

Mission Complete

Certificate Ready

Payment Success

Announcement

---

# Analytics

Student Active

Course Completion

Mission Completion

Quiz Score

Revenue

Top Course

Daily Visitor

Retention

---

# Performance

Server Component

Streaming

Lazy Loading

Code Splitting

Pagination

Infinite Scroll

Caching

ISR

---

# Background Jobs (Future)

Email Queue

Certificate Generator

Reminder Learning

Payment Verification

AI Processing

---

# AI Module

AI Mentor

AI Hint

AI Practice

AI Quiz Generator

AI Feedback

AI Recommendation

---

# Environment Variables

```
DATABASE_URL=

DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

NEXTAUTH_SECRET=

NEXT_PUBLIC_APP_URL=
```

---

# Coding Standard

TypeScript Strict

ESLint

Prettier

Repository Pattern

Service Pattern

SOLID

DRY

KISS

Reusable

Feature Based Folder

---

# Future Scalability

Redis Cache

Queue Worker

Realtime Notification

Forum Discussion

Affiliate

Subscription

Organization

Mobile API

GraphQL

Microservice

Docker

CI/CD

Multi Region

---

# Deployment

GitHub

↓

Vercel

↓

Supabase

↓

Custom Domain

---

# Backend Development Rules

- Tidak boleh query Prisma di React Component.
- Tidak boleh Business Logic di API Route.
- Semua query melalui Repository.
- Semua Business Logic melalui Service.
- Semua validasi menggunakan Zod.
- Semua upload menggunakan Supabase Storage.
- Semua endpoint memiliki validasi dan permission.
- Semua response menggunakan format standar.
- Semua fitur mengikuti PRD dan User Flow.
- Semua perubahan database melalui Prisma Migration.