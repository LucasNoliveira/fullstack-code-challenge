# Vocal Silence — Full-Stack Challenge

A full-stack web application featuring email-based OTP authentication and a company management dashboard with full CRUD, filtering, and server-side pagination.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS + Vite |
| Backend | Django + Django REST Framework |
| Database | SQLite (local) / PostgreSQL (production) |
| Auth | JWT (via `djangorestframework-simplejwt`) |
| Email / OTP | Django Console Backend (OTP appears in server logs) |
| Task Queue | Celery + Redis |
| Containerization | Docker + Docker Compose |

---

## Project Structure

```
.
├── backend/
│   ├── api/                   # Settings, URLs, Celery config
│   ├── authentication/        # OTP request, OTP verify, JWT
│   ├── companies/             # CRUD, filtering, pagination, send-status
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md

```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose installed

### 1. Clone the repository

```bash
git clone <repo-url>](https://github.com/LucasNoliveira/vocal-silence-code-challenge)
cd vocal-silence-code-challenge
```

### 2. Configure environment variables

Copy the example env files and fill in your values if you want to run it in production mode with PostgreSQL or ignore it if you want to use local configs with SQLite:

### 3. Start all services

```bash
docker compose up --build
```

This starts:
- `backend` — Django dev server on **http://localhost:8000**
- `frontend` — Vite dev server on **http://localhost:5173**
- `redis` — Celery message broker
- `worker` — Celery worker for async email tasks

### 4. Open the app

Navigate to **http://localhost:5173** in your browser.

---

## Authentication Flow

1. Enter your email on the login page and click **Send OTP**.
2. The backend generates a 6-digit OTP (valid for **5 minutes**, single use) and "sends" it via email.
3. **Since the Django Console Backend is used, the OTP will be printed in the `backend` container logs.** To view it:
   ```bash
   docker compose logs backend
   ```
4. Enter the OTP and click **Verify OTP** to receive a JWT and be redirected to the dashboard.

---

## API Overview

All endpoints are prefixed with `/api/v1/`.

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/request-otp/` | ❌ | Sends a 6-digit OTP to the given email |
| POST | `/auth/verify-otp/` | ❌ | Verifies OTP and returns a JWT |

### Companies

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/companies/` | ✅ | List companies (paginated, filterable) |
| POST | `/companies/` | ✅ | Create a company |
| GET | `/companies/{id}/` | ✅ | Retrieve a company |
| PATCH | `/companies/{id}/` | ✅ | Update a company |
| DELETE | `/companies/{id}/` | ✅ | Delete a company |
| POST | `/companies/{id}/send-status/` | ✅ | Email the company status to its contact |

#### Query Parameters (GET `/companies/`)

| Param | Type | Description |
|---|---|---|
| `search` | `string` | Text search on `name`, `description`, `contact_email` |
| `status` | `string` | Filter by status: `ready`, `in_progress`, `done`, `cancelled` |
| `page` | `integer` | Page number (default: `1`) |
| `page_size` | `integer` | Items per page (default: `10`, max: `100`) |

---

## Design Decisions & Trade-offs

- **SQLite locally, PostgreSQL in production** — SQLite requires zero setup for local development. The `DATABASE_URL` env var via makes swapping trivial.
- **Django Console Backend for email** — Avoids external dependencies during evaluation. The OTP is fully visible in `docker compose logs backend`.
- **Celery for async email dispatch** — The `send-status` email is dispatched as a Celery task so the API response is immediate and the caller is informed whether the task was enqueued successfully.
- **OTP lifecycle** — OTPs expire after 5 minutes and are invalidated on first use to prevent replay attacks. A basic per-email rate limit is applied to prevent abuse.
- **JWT in `Authorization` header** — The frontend stores the JWT in localStorage and attaches it to every authenticated request.

> ⚡ Note: Some design decisions were made considering the short timeframe of the challenge. Certain aspects could be further refined in a longer-term project.

## Stopping the App

```bash
docker compose down
```

To also remove volumes (wipes the database):

```bash
docker compose down -v
```
