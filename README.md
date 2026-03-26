# GearMarket

Marketplace de artículos deportivos

![logo](./docs/assets/logo1.jpeg)

## Problema que resuelve

Muchos deportistas venden o compran equipamiento usado (bicicletas, pesas, zapatillas técnicas, accesorios, entre otros) en plataformas genéricas como Marketplace (Facebook) o grupos en redes sociales, donde:

- no hay filtros especializados
- no existe información y reputación del vendedor
- las publicaciones están desordenadas

_GearMarket_ será un marketplace especializado en equipamiento deportivo.

## Público objetivo

Personas mayores de edad que practican deporte y desean comprar o vender equipamiento deportivo usado o seminuevo.

## Propuesta de valor

Permitir que deportistas compren y vendan equipamiento deportivo de manera simple, rápida y organizada, dentro de un marketplace especializado.

## Propuesta, Diseño y Requerimientos

Ir a directorio → [/docs](./docs/)

## Requisitos

- Tener instalada una terminal o consola de comandos.

## Instalación

Instrucciones para descargar el proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/aepenalver/gearmarket
```

2. Acceder al directorio:

```bash
cd gearmarket
```

## Estructura del proyecto

```bash
.
├── client         # Frontend: Interfaz de usuario y lógica de cliente
├── docs           # Documentación de la aplicación
└── server         # Backend: API REST, lógica de negocio y base de datos
```

## Puesta en marcha

### 1. Base de datos

Crear la base de datos `gearmarket` y ejecutar contenido de los siguientes archivos:

- `docs/base-datos/01_schema.sql`
- `docs/base-datos/02_seed.sql`

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
npm test
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Autores

[Daniel Aros](https://github.com/magicux)\
[Angel Peñalver](https://github.com/aepenalver)
