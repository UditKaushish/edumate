# EduMate

Frontend for an AI storytelling app for children. A child picks a story theme, reads a generated story, chats with its characters and answers questions along the way. A dashboard tracks reading progress.

This repository contains the user interface only. The screens use placeholder data and are not connected to a story-generation backend.

## Screens

| Route | Screen |
|---|---|
| `/` | Landing page |
| `/login`, `/signup` | Authentication forms |
| `/chatapp`, `/[chatId]` | Story chat with sidebar and voice input button |
| `/dashboard` | Stories read, correct answers, engagement score and reading progress charts |

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui components, Recharts

## Run locally

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.
