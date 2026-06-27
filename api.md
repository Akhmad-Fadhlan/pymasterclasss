# API Specification

Project : PyMasterClass

Version : 2.0

Architecture : REST API

Framework : Next.js 15 Route Handler + Server Actions

Authentication : Supabase Auth

Authorization : Role Based Access Control (RBAC)

Response : JSON

Base URL

```
/api/v1
```

---

# API Standard

## Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": []
}
```

---

# HTTP Status

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Authentication

Supabase Auth menangani

* Register
* Login
* Logout
* Refresh Session
* Reset Password
* Email Verification

Backend hanya menyediakan endpoint tambahan.

---

## POST

```
/api/v1/profile/setup
```

Digunakan setelah user berhasil register.

Body

```json
{
  "fullName":"",
  "username":""
}
```

---

## GET

```
/api/v1/profile
```

Mengambil profil user.

---

## PUT

```
/api/v1/profile
```

Update

* avatar
* bio
* phone
* social media

---

# Dashboard

## GET

```
/api/v1/dashboard
```

Response

* Current Course
* Progress
* XP
* Achievement
* Recent Activity
* Continue Learning

---

# Landing Page

## GET

```
/api/v1/home
```

Menampilkan data landing page

Response

* Hero
* Statistics
* Featured Course
* Testimonial
* FAQ

---

# Category

## GET

```
/api/v1/categories
```

---

## POST

```
/api/v1/categories
```

Admin

---

## PUT

```
/api/v1/categories/{id}
```

---

## DELETE

```
/api/v1/categories/{id}
```

---

# Course

## GET

```
/api/v1/courses
```

List semua course.

---

## GET

```
/api/v1/courses/{slug}
```

Detail Course.

---

## POST

```
/api/v1/courses
```

Admin

Create Course.

---

## PUT

```
/api/v1/courses/{id}
```

Update Course.

---

## DELETE

```
/api/v1/courses/{id}
```

Soft Delete.

---

# Enrollment

## POST

```
/api/v1/enrollments
```

Enroll Course.

---

## GET

```
/api/v1/enrollments
```

My Course.

---

# Mission

## GET

```
/api/v1/missions/{courseId}
```

---

## POST

```
/api/v1/missions
```

Admin.

---

## PUT

```
/api/v1/missions/{id}
```

---

## DELETE

```
/api/v1/missions/{id}
```

---

# Lesson

## GET

```
/api/v1/lessons/{missionId}
```

---

## GET

```
/api/v1/lessons/detail/{id}
```

---

## POST

```
/api/v1/lessons
```

Admin.

---

## PUT

```
/api/v1/lessons/{id}
```

---

## DELETE

```
/api/v1/lessons/{id}
```

---

# Slide

## GET

```
/api/v1/slides/{lessonId}
```

---

## POST

```
/api/v1/slides
```

Admin.

---

## PUT

```
/api/v1/slides/{id}
```

---

## DELETE

```
/api/v1/slides/{id}
```

---

# Practice

## GET

```
/api/v1/practices/{lessonId}
```

---

## POST

```
/api/v1/practices
```

Admin.

---

## POST

```
/api/v1/practices/submit
```

Student submit latihan.

---

# Quiz

## GET

```
/api/v1/quizzes/{lessonId}
```

---

## POST

```
/api/v1/quizzes/start
```

---

## POST

```
/api/v1/quizzes/submit
```

Response

```json
{
  "score":95,
  "passed":true,
  "xp":100
}
```

---

# Progress

## GET

```
/api/v1/progress
```

---

## PUT

```
/api/v1/progress
```

Update progress.

---

# Project

## GET

```
/api/v1/projects/{missionId}
```

---

## POST

```
/api/v1/projects/upload
```

Upload project.

---

## GET

```
/api/v1/projects/submission
```

History.

---

# Certificate

## GET

```
/api/v1/certificates
```

My Certificate.

---

## GET

```
/api/v1/certificates/{id}
```

Detail Certificate.

---

## GET

```
/api/v1/certificates/download/{id}
```

Download PDF.

---

# Notification

## GET

```
/api/v1/notifications
```

---

## PUT

```
/api/v1/notifications/read/{id}
```

---

# Achievement

## GET

```
/api/v1/achievements
```

---

# Search

## GET

```
/api/v1/search
```

Query

```text
keyword
category
level
```

---

# Upload

Menggunakan Supabase Storage.

---

## POST

```
/api/v1/upload/avatar
```

---

## POST

```
/api/v1/upload/course-thumbnail
```

---

## POST

```
/api/v1/upload/project
```

---

## POST

```
/api/v1/upload/certificate
```

---

# Admin Dashboard

## GET

```
/api/v1/admin/dashboard
```

Response

* Total User
* Total Course
* Revenue
* Active Student
* Monthly Visitor

---

# Admin User

## GET

```
/api/v1/admin/users
```

---

## POST

```
/api/v1/admin/users
```

---

## PUT

```
/api/v1/admin/users/{id}
```

---

## DELETE

```
/api/v1/admin/users/{id}
```

---

# Admin Course

CRUD lengkap.

---

# Admin Category

CRUD lengkap.

---

# Admin Mission

CRUD lengkap.

---

# Admin Lesson

CRUD lengkap.

---

# Admin Slide

CRUD lengkap.

---

# Admin Practice

CRUD lengkap.

---

# Admin Quiz

CRUD lengkap.

---

# Admin Question

CRUD lengkap.

---

# Admin Project

CRUD lengkap.

---

# Admin Certificate

CRUD lengkap.

---

# Admin Announcement

CRUD lengkap.

---

# Analytics

## GET

```
/api/v1/admin/analytics
```

Response

* Revenue
* Active User
* Course Completion
* Quiz Completion
* Learning Time
* Visitor
* Conversion Rate

---

# Middleware

Public

Guest

Authenticated

Verified Email

Student

Instructor

Admin

Super Admin

---

# Validation

Semua endpoint wajib menggunakan

* Zod
* Prisma Validation
* Supabase Session Validation

---

# Rate Limit

Public API

100 Request / menit

Authenticated

300 Request / menit

Admin

Unlimited

---

# API Rules

* Menggunakan Repository Pattern.
* Business Logic berada di Service Layer.
* Tidak boleh memanggil Prisma langsung dari Route Handler.
* Tidak boleh memanggil Supabase langsung dari React Component.
* Semua endpoint wajib memiliki validasi.
* Semua endpoint wajib mengembalikan response standar.
* Semua endpoint admin wajib menggunakan RBAC.
* Semua upload menggunakan Supabase Storage.
* Semua perubahan database menggunakan Prisma.
* Semua endpoint terdokumentasi dan menggunakan TypeScript.
