# Deployment Guide

Project : PyMasterClass

Version : 2.0

Deployment Target

- GitHub
- Vercel
- Supabase

---

# Deployment Architecture

```
                Developer
                     │
                     ▼
                 GitHub
                     │
          Automatic Deployment
                     │
                     ▼
                 Vercel
                     │
      ┌──────────────┴──────────────┐
      │                             │
      ▼                             ▼
 Supabase Auth              PostgreSQL Database
      │                             │
      └──────────────┬──────────────┘
                     ▼
              Supabase Storage
```

---

# Requirements

Install

- Node.js 22 LTS
- Git
- VSCode

Account

- GitHub
- Vercel
- Supabase

---

# Clone Repository

```bash
git clone https://github.com/username/pymasterclass.git
```

Masuk project

```bash
cd pymasterclass
```

---

# Install Dependency

```bash
npm install
```

---

# Environment Variables

Buat file

```
.env
```

Isi

```env
DATABASE_URL=

DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

NEXTAUTH_SECRET=

NEXT_PUBLIC_APP_URL=
```

---

# Setup Supabase

Masuk Dashboard

↓

Create Project

↓

Pilih Region

↓

Tunggu selesai

---

# Ambil API

Project Settings

↓

API

Salin

- URL
- anon key
- service role key

Masukkan ke .env

---

# PostgreSQL

Masuk

Settings

↓

Database

↓

Connection String

Copy

DATABASE_URL

DIRECT_URL

---

# Prisma

Generate Client

```bash
npx prisma generate
```

---

Migration

Development

```bash
npx prisma migrate dev
```

Production

```bash
npx prisma migrate deploy
```

---

# Seed Database

```bash
npm run seed
```

Data awal

- Admin
- Category
- Course
- Achievement
- Settings

---

# Run Development

```bash
npm run dev
```

Website

```
http://localhost:3000
```

---

# Build Test

```bash
npm run build
```

Tidak boleh ada error.

---

# Push GitHub

```bash
git add .

git commit -m "Initial Commit"

git push origin main
```

---

# Deploy Vercel

Masuk

https://vercel.com

↓

Import Project

↓

GitHub

↓

Pilih Repository

↓

Deploy

---

# Environment Variables

Masuk

Project

↓

Settings

↓

Environment Variables

Tambah

DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

NEXTAUTH_SECRET

NEXT_PUBLIC_APP_URL

Redeploy.

---

# Domain

Masuk

Settings

↓

Domains

Tambah

```
pymasterclass.com
```

atau

```
learn.pymasterclass.com
```

Update DNS.

---

# HTTPS

Vercel otomatis menggunakan SSL.

Tidak perlu konfigurasi tambahan.

---

# Storage

Supabase

↓

Storage

↓

Buat Bucket

avatars

course-thumbnail

lesson-thumbnail

project-files

certificates

public-assets

---

# Auth

Supabase

↓

Authentication

↓

URL Configuration

Tambahkan

Development

```
http://localhost:3000
```

Production

```
https://pymasterclass.com
```

---

# Redirect URL

Tambahkan

```
http://localhost:3000/auth/callback

https://pymasterclass.com/auth/callback
```

---

# Email

Authentication

↓

Email

Aktifkan

Email Verification

Password Reset

Magic Link (Future)

---

# RLS

Aktifkan Row Level Security.

Pastikan seluruh tabel memiliki policy.

---

# Backup

Database

Daily Backup

Storage

Weekly Backup

---

# Monitoring

Pantau

- Build Error
- API Error
- Database Error
- Auth Error
- Storage Error

---

# Logging

Gunakan

Vercel Log

Supabase Log

Audit Log

---

# CI/CD Flow

```
Developer

↓

Git Commit

↓

GitHub

↓

Vercel Build

↓

Run Prisma Generate

↓

Deploy

↓

Production
```

---

# Release Checklist

Development

☐ npm install

☐ npm run lint

☐ npm run build

☐ prisma generate

☐ prisma migrate

☐ Testing

Production

☐ Environment Variable

☐ SSL

☐ Domain

☐ Backup

☐ Storage

☐ Auth

☐ Analytics

☐ Monitoring

---

# Rollback

Jika deployment gagal

Masuk

Vercel

↓

Deployment

↓

Pilih deployment sebelumnya

↓

Promote to Production

---

# Deployment Rules

- Tidak boleh commit file .env
- Selalu gunakan migration Prisma
- Semua perubahan melalui Git
- Build wajib sukses sebelum merge
- Environment Variables hanya disimpan di Vercel
- Database hanya diakses melalui Prisma
- Tidak boleh mengubah database langsung di Supabase Production
- Selalu backup sebelum migration besar

---

# Production Checklist

Frontend

☐ Responsive

☐ SEO

☐ Performance

☐ Accessibility

Backend

☐ API

☐ Auth

☐ Upload

☐ Validation

Database

☐ Migration

☐ RLS

☐ Backup

Security

☐ HTTPS

☐ CSP

☐ Rate Limit

☐ Audit Log

Deployment

☐ Domain

☐ SSL

☐ Monitoring

☐ Error Tracking

Project dinyatakan siap digunakan apabila seluruh checklist telah terpenuhi.