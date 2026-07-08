# Notice Board

A full-stack Notice Board application built as part of the Reno Platforms Web Development Assignment.

The application supports complete Create, Read, Update, and Delete (CRUD) operations for notices using Next.js Pages Router, Prisma ORM, MySQL (TiDB Cloud), and Tailwind CSS.

## Features

- Create, Read, Update and Delete notices
- Responsive card-based layout
- Server-side validation
- RESTful API using Next.js API Routes
- Delete confirmation dialog
- Urgent notices displayed first using Prisma `orderBy`
- Persistent hosted database using TiDB Cloud
- Optional image URL support

## Tech Stack

- Next.js (Pages Router)
- React
- Tailwind CSS
- Prisma ORM
- MySQL (TiDB Cloud)
- Vercel

---

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/ishannamata/reno-notice-board.git
```

### 2. Navigate to the project

```bash
cd reno-notice-board
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
DATABASE_URL="YOUR_DATABASE_CONNECTION_STRING"
```

### 5. Run Prisma migration

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## One Thing I Would Improve With More Time

Given more time, I would implement image uploads using cloud storage (such as Cloudinary) instead of image URLs. I would also add search, filtering, pagination, and user authentication to make the application more suitable for production use.

---

## AI Usage

AI tools were used to assist with:

- Planning the project structure
- Reviewing and improving code quality
- Debugging issues
- Suggesting UI improvements

All implementation, integration, testing, debugging, and final verification were completed manually.

---

## Live Demo

**Vercel:** https://reno-notice-board-ruby.vercel.app/

## Repository

**GitHub:** https://github.com/ishannamata/reno-notice-board