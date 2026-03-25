# GearMarket Backend - Hito 3

## Requisitos
- Node.js 18+
- PostgreSQL 14+
- npm

## Instalación
```bash
cd server
npm install
cp .env.example .env
```

## Base de datos
Crear la base `gearmarket` y ejecutar:
1. `docs/base-datos/01_schema.sql`
2. `docs/base-datos/02_seed.sql`

## Variables de entorno
Revisar `.env.example`.

## Ejecución
```bash
npm run dev
```

## Tests
```bash
npm test
```

## Rutas principales
- `/api/v1/auth`
- `/api/v1/publications`
- `/api/v1/favorites`
- `/api/v1/messages`
- `/api/v1/profile`
