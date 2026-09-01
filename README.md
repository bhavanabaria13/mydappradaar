# Here are your Instructions

-https://chatgpt.com/c/6a6b09aa-2bb0-83ee-b9c5-07434a708546


E:\2026-Web3-Games\30july\dappradaar-main\frontend>npm run dev
E:\2026-Web3-Games\30july\dappradaar-main\backend>npm run dev


1. Project Clone
git clone https://github.com/bhavanabaria13/dappradaar.git
cd dappradaar
//-------------------------------------------------------------------

2. Install PostgreSQL

Download PostgreSQL 15+

https://www.postgresql.org/download/windows/

Installation પછી pgAdmin અથવા psql દ્વારા database બનાવો.

CREATE DATABASE dappradaar;

CREATE USER dappradaar WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE dappradaar TO dappradaar;

અથવા postgres user પણ use કરી શકો.

//-----------------------------------------------------------------------
3. Folder Structure

સામાન્ય રીતે

dappradaar/
│
├── frontend/
├── backend/
└── README.md

...................................................
4. Backend Setup

Backend folder માં જાઓ

cd backend

Install packages

npm install
----------------------------------------------
5. Create .env

backend/.env

PORT=8001

DATABASE_URL="postgresql://postgres:password@localhost:5432/dappradaar"

JWT_SECRET=your_super_secret_key

UPLOAD_MODE=local

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

જો postgres password અલગ હોય તો change કરવો.
-----------------------------------------------------
6. Prisma Generate
npx prisma generate
---------------------------------
7. Run Migration

જો migration folder હોય

npx prisma migrate dev

જો migration ના હોય

npx prisma db push
--------------------------------------
8. Seed Database

જો package.json માં seed command હોય

npm run seed

અથવા

npx prisma db seed

admin@etherauthority.com

Password:
Admin@123
(https://bcrypt-generator.com/)


---------------------
9. Start Backend
npm run dev

અથવા

npm start

Output

Server running on

http://localhost:8001

------------------------------------------
10. Frontend Setup

બીજું terminal

cd frontend

Install

npm install
-------------------------------------
11. Create frontend .env

જો project Vite છે

frontend/.env
VITE_API_URL=http://localhost:8001/api
---------------------------------
12. Start Frontend
npm run dev

Open

http://localhost:3000
-----------------------
13. Login
Email

admin@etherauthority.com

Password

Admin@123
--------------------------------------------
14. Check API

Browser માં

http://localhost:8001/api/upload/status

Response

{
  "mode":"local"
}
---------------------------
15. Prisma Commands

Generate Client

npx prisma generate

Push Schema

npx prisma db push

Migration

npx prisma migrate dev
Open Studio

npx prisma studio
-------------------------------------
16. Common Errors
Error
P1001
Can't reach database server

Solution

PostgreSQL service start કરો.

Error
DATABASE_URL missing

Solution

.env check કરો.
Error
Prisma Client not generated

Run

npx prisma generate
Error
relation does not exist

Run

npx prisma migrate dev
અથવા

npx prisma db push
Error
JWT_SECRET missing

.env

JWT_SECRET=anything_random_here
Error
Port 8001 already in use
Change

PORT=8002

અને frontend માં પણ

VITE_API_URL=http://localhost:8002/api

---------------------------------------------------
17. Run Both Together

Terminal 1

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

Terminal 2

cd frontend
npm install
npm run dev
--------------------------------
npm run dev
18. Verify Everything
✅ Frontend: http://localhost:3000
✅ Backend API: http://localhost:8001
✅ Prisma Studio: npx prisma studio
✅ Admin Login works
✅ Dashboard opens
✅ Games CRUD
✅ DApps CRUD
✅ Blogs CRUD
✅ Category CRUD
✅ Image Upload
✅ Newsletter
✅ Contact Form
✅ Search
-------------------------
--------------------------------------------


































src/pages/Home.j

Pasted text(29).txt
Document
here already data but login not work, data not show

હવે schema મળી ગયું.

પણ password ને plain text (Admin@123) તરીકે insert કરશો તો login નહીં થાય, કારણ કે backend bcrypt.compare() વાપરે છે.

Option 1 (Recommended): Seed ચલાવો

જો project માં seed file છે તો:

npm run seed

અથવા

npx prisma db seed
Option 2: Manual Insert (જો backend plain text check કરતું ન હોય)

જો તમને માત્ર record બનાવવો હોય (login કામ ન પણ કરે), તો:

INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'admin@etherauthority.com',
    'Admin@123',
    'Administrator',
    'admin',
    NOW(),
    NOW()
);

જો gen_random_uuid() ઉપલબ્ધ ન હોય તો:

CREATE EXTENSION IF NOT EXISTS pgcrypto;
Option 3 (Login કામ કરશે)

જો backend bcrypt.compare() વાપરે છે, તો password hash insert કરવો પડશે.

કૃપા કરીને આ file મોકલો:

backend/src/routes/auth.js

અથવા

backend/src/controllers/auth.js

અથવા login function જ્યાં છે.

ખાસ કરીને જ્યાં લખેલું હોય:

bcrypt.compare(...)

અથવા

bcrypt.compareSync(...)

હું તમને Admin@123 માટે bcrypt hash સાથે ready-to-run INSERT query આપી દઈશ, જેથી login પણ તરત કામ કરશે.

client:802 WebSocket connection to 'wss://localhost/?token=2bW26MSVNbkb' failed: 
createConnection @ client:802
client:841 [vite] failed to connect to websocket (Error: WebSocket closed without opened.). 
connect @ client:841
client:454 Uncaught (in promise) Error: WebSocket closed without opened.
    at WebSocket.<anonymous> (client:454:22)

આ Vite WebSocket error મુખ્ય સમસ્યા નથી. Hot Reloa