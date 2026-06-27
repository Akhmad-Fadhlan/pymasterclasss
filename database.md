# Database Design

**Project:** PyMasterClass

Version 2.0

Database Engine : PostgreSQL (Supabase)

ORM : Prisma ORM

---

# Database Rules

Semua tabel menggunakan UUID.

Semua tabel memiliki

* id
* createdAt
* updatedAt

Semua relasi menggunakan Prisma Relation.

Semua perubahan database dilakukan menggunakan Prisma Migration.

Tidak boleh mengubah database secara manual.

---

# Naming Convention

Table

snake_case

Column

camelCase

Model Prisma

PascalCase

Enum

UPPER_CASE

---

# ERD

```text
Role
 │
 └────────────┐
              │
           User
              │
    ┌─────────┼───────────────┐
    │         │               │
 Enrollment Payment     Notification
    │
    ▼
 Course
    │
    ▼
 Mission
    │
    ▼
 Lesson
    │
 ┌──┴──────────────┐
 │                 │
Slide          Practice
 │                 │
 └───────┐     Quiz
         │       │
         ▼       ▼
     Progress  Question
                  │
               Answer

User
 │
 ├── Certificate
 ├── Submission
 ├── Achievement
 └── Activity Log
```

---

# Enum

Role

```text
ADMIN

INSTRUCTOR

STUDENT
```

---

Course Level

```text
BEGINNER

INTERMEDIATE

ADVANCED
```

---

Course Status

```text
DRAFT

PUBLISHED

ARCHIVED
```

---

Payment Status

```text
PENDING

PAID

FAILED

REFUND
```

---

Submission Status

```text
PENDING

REVIEW

REVISION

APPROVED

REJECTED
```

---

# Tables

## roles

| Field       | Type     |
| ----------- | -------- |
| id          | UUID     |
| name        | String   |
| description | String   |
| createdAt   | DateTime |
| updatedAt   | DateTime |

---

## users

| Field      | Type     |
| ---------- | -------- |
| id         | UUID     |
| roleId     | UUID     |
| fullName   | String   |
| username   | String   |
| email      | String   |
| avatar     | String   |
| bio        | String   |
| phone      | String   |
| isVerified | Boolean  |
| createdAt  | DateTime |
| updatedAt  | DateTime |

---

## categories

| Field       | Type   |
| ----------- | ------ |
| id          | UUID   |
| name        | String |
| slug        | String |
| icon        | String |
| description | Text   |
| orderNumber | Int    |

---

## courses

| Field            | Type     |
| ---------------- | -------- |
| id               | UUID     |
| categoryId       | UUID     |
| title            | String   |
| slug             | String   |
| shortDescription | String   |
| description      | Text     |
| thumbnail        | String   |
| level            | Enum     |
| duration         | Int      |
| price            | Decimal  |
| status           | Enum     |
| createdAt        | DateTime |
| updatedAt        | DateTime |

---

## enrollments

| Field       | Type     |
| ----------- | -------- |
| id          | UUID     |
| userId      | UUID     |
| courseId    | UUID     |
| progress    | Float    |
| startedAt   | DateTime |
| completedAt | DateTime |

---

## missions

| Field       | Type   |
| ----------- | ------ |
| id          | UUID   |
| courseId    | UUID   |
| title       | String |
| description | Text   |
| orderNumber | Int    |
| xpReward    | Int    |

---

## lessons

| Field       | Type   |
| ----------- | ------ |
| id          | UUID   |
| missionId   | UUID   |
| title       | String |
| slug        | String |
| duration    | Int    |
| orderNumber | Int    |

---

## slides

| Field       | Type   |
| ----------- | ------ |
| id          | UUID   |
| lessonId    | UUID   |
| title       | String |
| content     | JSON   |
| orderNumber | Int    |

---

## practices

| Field          | Type   |
| -------------- | ------ |
| id             | UUID   |
| lessonId       | UUID   |
| title          | String |
| instruction    | Text   |
| starterCode    | Text   |
| expectedOutput | Text   |

---

## quizzes

| Field        | Type   |
| ------------ | ------ |
| id           | UUID   |
| lessonId     | UUID   |
| title        | String |
| passingScore | Int    |
| duration     | Int    |

---

## questions

| Field       | Type |
| ----------- | ---- |
| id          | UUID |
| quizId      | UUID |
| question    | Text |
| explanation | Text |
| orderNumber | Int  |

---

## answers

| Field      | Type    |
| ---------- | ------- |
| id         | UUID    |
| questionId | UUID    |
| answer     | Text    |
| isCorrect  | Boolean |

---

## quiz_attempts

| Field      | Type     |
| ---------- | -------- |
| id         | UUID     |
| userId     | UUID     |
| quizId     | UUID     |
| score      | Float    |
| startedAt  | DateTime |
| finishedAt | DateTime |

---

## progress

| Field      | Type    |
| ---------- | ------- |
| id         | UUID    |
| userId     | UUID    |
| lessonId   | UUID    |
| percentage | Float   |
| completed  | Boolean |

---

## projects

| Field     | Type   |
| --------- | ------ |
| id        | UUID   |
| missionId | UUID   |
| title     | String |
| rubric    | JSON   |
| maxScore  | Int    |

---

## submissions

| Field         | Type   |
| ------------- | ------ |
| id            | UUID   |
| projectId     | UUID   |
| userId        | UUID   |
| repositoryUrl | String |
| liveUrl       | String |
| attachment    | String |
| feedback      | Text   |
| score         | Float  |
| status        | Enum   |

---

## certificates

| Field             | Type     |
| ----------------- | -------- |
| id                | UUID     |
| userId            | UUID     |
| courseId          | UUID     |
| certificateNumber | String   |
| fileUrl           | String   |
| issuedAt          | DateTime |

---

## payments

| Field             | Type     |
| ----------------- | -------- |
| id                | UUID     |
| userId            | UUID     |
| amount            | Decimal  |
| paymentMethod     | String   |
| paymentStatus     | Enum     |
| transactionNumber | String   |
| paidAt            | DateTime |

---

## notifications

| Field   | Type    |
| ------- | ------- |
| id      | UUID    |
| userId  | UUID    |
| title   | String  |
| message | Text    |
| type    | String  |
| isRead  | Boolean |

---

## achievements

| Field | Type   |
| ----- | ------ |
| id    | UUID   |
| title | String |
| icon  | String |
| xp    | Int    |

---

## user_achievements

| Field         | Type     |
| ------------- | -------- |
| id            | UUID     |
| userId        | UUID     |
| achievementId | UUID     |
| earnedAt      | DateTime |

---

## announcements

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| title     | String   |
| content   | Text     |
| publishAt | DateTime |

---

## settings

| Field           | Type    |
| --------------- | ------- |
| id              | UUID    |
| siteName        | String  |
| siteLogo        | String  |
| maintenanceMode | Boolean |

---

## activity_logs

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| userId    | UUID     |
| action    | String   |
| module    | String   |
| ipAddress | String   |
| createdAt | DateTime |

---

# Index

Buat index pada kolom berikut

* email
* username
* slug
* courseId
* lessonId
* missionId
* userId
* createdAt
* status

---

# Storage Bucket

Supabase Storage

avatars

course-thumbnail

lesson-thumbnail

course-assets

project-files

certificates

public-assets

---

# Row Level Security

Aktifkan RLS pada seluruh tabel.

Student hanya dapat membaca dan mengubah data miliknya sendiri.

Admin memiliki akses penuh.

Instructor hanya dapat mengakses data course yang dimilikinya.

---

# Audit

Semua tabel penting memiliki

createdAt

updatedAt

createdBy

updatedBy

---

# Prisma Migration

Semua perubahan database wajib melalui

```bash
npx prisma migrate dev
```

Production

```bash
npx prisma migrate deploy
```

Dilarang melakukan perubahan langsung melalui Supabase Table Editor kecuali kondisi maintenance darurat.

---

# Future Tables

* discussions
* comments
* forum_topics
* live_classes
* live_attendance
* subscriptions
* bundles
* coupons
* wishlist
* reviews
* referral
* affiliates
* organizations
* teams
* ai_chat_history
* ai_feedback
* invoices
* support_tickets
* certificates_templates
* gamification_levels
* badges
