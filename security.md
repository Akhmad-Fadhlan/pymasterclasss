# Security Architecture

Project : PyMasterClass

Version : 2.0

---

# Overview

Dokumen ini menjelaskan seluruh standar keamanan backend PyMasterClass.

Semua modul wajib mengikuti aturan pada dokumen ini.

---

# Security Principles

* Zero Trust
* Least Privilege
* Defense in Depth
* Secure by Default
* Fail Secure

---

# Authentication

Provider

Supabase Auth

Method

* Email Password

Future

* Google
* GitHub
* Microsoft

---

# Login Flow

```text
Landing

↓

Login

↓

Supabase Auth

↓

JWT

↓

Middleware

↓

Dashboard
```

---

# Registration

Flow

```text
Register

↓

Supabase Auth

↓

Verification Email

↓

Setup Profile

↓

Dashboard
```

---

# Session

Managed by Supabase.

Session Refresh otomatis.

JWT tidak disimpan pada Local Storage.

Gunakan HttpOnly Cookie.

---

# Password Policy

Minimal 8 karakter.

Harus memiliki

* Huruf Besar
* Huruf Kecil
* Angka
* Simbol

Password lama tidak boleh digunakan kembali.

---

# Email Verification

User wajib melakukan verifikasi email.

User yang belum terverifikasi tidak dapat mengakses Dashboard.

---

# Forgot Password

Menggunakan Supabase Reset Password.

Link hanya berlaku selama beberapa menit.

Token hanya dapat digunakan satu kali.

---

# Authorization

Role Based Access Control (RBAC)

Role

Guest

Student

Instructor

Admin

Super Admin

---

# Permission

Guest

* Landing
* Login
* Register

Student

* Dashboard
* Learning
* Quiz
* Certificate

Instructor

* Kelola Course miliknya

Admin

* Semua CRUD

Super Admin

* System Settings
* User Management
* Analytics

---

# Middleware

Urutan Middleware

```text
Request

↓

Session Validation

↓

Email Verification

↓

Role Check

↓

Permission Check

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Database
```

---

# Route Protection

Public

* Landing
* Login
* Register
* Pricing

Authenticated

* Dashboard
* Learning
* Profile

Admin

* Admin Dashboard
* Course CRUD
* User CRUD

---

# API Security

Semua endpoint wajib

* Session Validation
* Role Validation
* Zod Validation
* Rate Limiter

---

# Input Validation

Gunakan Zod.

Semua request wajib divalidasi.

Tidak boleh mempercayai input dari client.

---

# SQL Injection

Seluruh query menggunakan Prisma ORM.

Tidak menggunakan raw SQL kecuali diperlukan.

---

# XSS Protection

Escape seluruh output HTML.

Sanitize input sebelum disimpan.

Tidak mengizinkan script tag.

---

# CSRF

Gunakan Origin Validation.

Gunakan SameSite Cookie.

Gunakan HttpOnly Cookie.

---

# CORS

Hanya domain berikut

Development

```text
http://localhost:3000
```

Production

```text
https://pymasterclass.com
```

---

# File Upload

Storage

Supabase Storage

Bucket

avatars

course-thumbnail

lesson-thumbnail

project-files

certificates

---

# Upload Validation

Image

* jpg
* jpeg
* png
* webp

Document

* pdf

Ukuran maksimum

Image

5 MB

PDF

20 MB

---

# File Security

Rename menggunakan UUID.

Scan MIME Type.

Tolak executable.

Tolak file ganda.

---

# Row Level Security

Seluruh tabel menggunakan RLS.

Student hanya dapat mengakses data miliknya.

Instructor hanya dapat mengakses course miliknya.

Admin dapat mengakses seluruh data.

---

# Environment Variables

Tidak boleh di-hardcode.

Gunakan

DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

NEXTAUTH_SECRET

---

# Secret Management

Semua secret disimpan di

* Local .env
* Vercel Environment Variables

Tidak boleh di GitHub.

---

# Logging

Catat

* Login
* Logout
* Register
* Reset Password
* Payment
* Upload
* Admin Activity
* Error

---

# Audit Trail

Setiap perubahan data penting menyimpan

* createdBy
* updatedBy
* createdAt
* updatedAt

---

# Rate Limiting

Public

100 request / menit

Authenticated

300 request / menit

Admin

Unlimited

---

# Monitoring

Pantau

* Failed Login
* Failed Payment
* API Error
* Upload Error
* Database Error

---

# Backup

Database

Backup harian.

Retention

30 hari.

Storage

Backup mingguan.

---

# Error Handling

Jangan tampilkan stack trace kepada user.

Semua error dicatat di server.

---

# Security Headers

Gunakan

* Content Security Policy
* X-Frame-Options
* X-Content-Type-Options
* Referrer Policy
* Permissions Policy

---

# HTTPS

Seluruh request wajib HTTPS.

Tidak mengizinkan HTTP pada production.

---

# Dependency Security

Lakukan audit secara berkala

```bash
npm audit
```

Update dependency secara rutin.

---

# Deployment Security

Gunakan Environment Variables.

Jangan commit file `.env`.

Aktifkan branch protection pada repository.

---

# Incident Response

Jika ditemukan kebocoran

1. Nonaktifkan service key.
2. Rotasi secret.
3. Logout seluruh session.
4. Audit log.
5. Informasikan pengguna jika diperlukan.

---

# Security Checklist

* Supabase Auth aktif.
* Email verification aktif.
* RLS aktif.
* Semua endpoint menggunakan middleware.
* Validasi Zod pada seluruh request.
* Prisma ORM tanpa query raw.
* Upload tervalidasi.
* Environment Variables aman.
* HTTPS aktif.
* Audit log aktif.
* Backup database berjalan.
