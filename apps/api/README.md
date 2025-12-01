# Employee Shift Board - Backend

## Setup
1. Copy `.env.example` to `.env` and fill `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:
   npm install

3. Seed initial data (creates employees and users):
   npm run seed

4. Run dev server:
   npm run dev
   (server listens on PORT in .env or 4000)

## Endpoints
POST /login
GET /employees
POST /shifts
GET /shifts?employee=xx&date=YYYY-MM-DD
DELETE /shifts/:id

Authentication: Bearer token from POST /login
Roles: admin or user (seeded 'admin' & 'user')
