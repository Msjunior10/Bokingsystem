# Restaurant Booking System

Ett fullstack-projekt för bordsbokning med rollbaserad inloggning (användare/admin).

## Funktioner
- Registrera och logga in användare (JWT-auth)
- Användare kan boka, se, ändra och ta bort sina egna bokningar
- Admin kan se, ändra och ta bort alla bokningar
- Admin kan redigera bokningar direkt i adminsidan
- React frontend, .NET WebAPI backend, SQLite databas

## Teknologier
- Frontend: React, Axios, React Router, Bootstrap
- Backend: .NET 7 WebAPI, SQLite, JWT

## Kom igång

### 1. Klona repo och installera
```bash
git clone <repo-url>
cd restaurant-booking
npm install
```

### 2. Starta backend
```bash
cd RestaurantApi
dotnet run
```

### 3. Starta frontend
```bash
cd ..

```

### 4. Skapa admin
Första användaren som registreras blir admin automatiskt.

## API-endpoints (urval)
- `POST /auth/register` – registrera användare
- `POST /auth/login` – logga in och få JWT
- `GET /booking` – hämta egna bokningar
- `GET /booking/admin/bookings` – hämta alla bokningar (admin)
- `POST /booking` – skapa bokning
- `PUT /booking/{id}` – uppdatera bokning
- `DELETE /booking/{id}` – ta bort bokning

## Miljövariabler
- JWT-key är hårdkodad i backend, byt ut för produktion!

## Tips
- Om du vill börja om: ta bort `RestaurantApi/DB/Resturant.db` och starta om backend.
- Admin-funktioner syns bara för admin-användare.

## Kontakt
Msjunior10 på GitHub

