# GearMarket

Entrega regenerada del **Proyecto Grupal Hito 3**. El hito pide levantar un backend npm con PostgreSQL, JWT, CORS, middlewares y pruebas con `supertest` sobre al menos 4 rutas/escenarios. Además, el frontend quedó ajustado para consumir el backend real. 

## Estructura
- `client/`: frontend React + Vite
- `server/`: backend Express + pg + JWT
- `docs/`: base de datos, contratos API, OpenAPI y checklist del hito

## Puesta en marcha

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
npm test
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

### 3. Base de datos
Crear la BD `gearmarket` y ejecutar:
- `docs/base-datos/01_schema.sql`
- `docs/base-datos/02_seed.sql`

## Archivos importantes
- `docs/hitos-desarrollo/checklist-hito3.md`
- `docs/api/contratos-api-rest.md`
- `docs/api/openapi.yaml`
- `docs/api/thunder-client-gearmarket-hito3.json`
