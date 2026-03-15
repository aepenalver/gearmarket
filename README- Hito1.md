# GearMarket · Hito 1

Repositorio preparado para la rama `feature/hito1`.

## Objetivo del Hito 1
Dejar definida la base de diseño del proyecto:
- boceto de vistas
- navegación pública y privada
- dependencias
- modelo de base de datos y relaciones
- contrato de datos / servicios de la API REST
- estructura del proyecto con enfoque MVC

## Estructura principal
- `docs/` → entregables del hito
- `client/` → estructura base del frontend React
- `server/` → estructura base del backend Express MVC
- `assets/` → recursos visuales del proyecto

## Stack definido
- Frontend: React + Vite + React Router + Context API + Bootstrap
- Backend: Node.js + Express + JWT + bcrypt + pg
- Base de datos: PostgreSQL

## Cómo subir esta estructura a GitHub
```bash
git clone https://github.com/aepenalver/gearmarket.git
cd gearmarket
git checkout feature/hito1
# copiar el contenido de este paquete dentro del repositorio
git add .
git commit -m "docs: entrega completa hito 1"
git push origin feature/hito1
```
