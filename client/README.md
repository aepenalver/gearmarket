# GearMarket Frontend · Hito 2

Aplicación cliente desarrollada con React y Vite para el marketplace deportivo **GearMarket**.

## Stack implementado

- React 18
- Vite
- React Router DOM
- Context API
- Hooks personalizados
- Bootstrap 5
- React Hook Form
- Axios

## Requerimientos cubiertos

- Navegación entre rutas públicas y privadas.
- Reutilización de componentes con props y renderización dinámica.
- Uso de hooks nativos y personalizados.
- Manejo de estado global con Context API.
- Preparación para consumo de API REST según el contrato del Hito 1.

## Estructura principal

```bash
client/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Instalación

```bash
cd client
npm install
npm run dev
```

La aplicación quedará disponible, por defecto, en `http://localhost:5173`.

## Variables de entorno opcionales

Crear un archivo `.env` dentro de `client/`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Si la API no está disponible, la app utiliza **mock data** local para mantener la experiencia navegable y demostrar los flujos del frontend.

## Rutas implementadas

### Públicas

- `/`
- `/galeria`
- `/publicaciones/:id`
- `/login`
- `/registro`

### Privadas

- `/perfil`
- `/mis-publicaciones`
- `/crear-publicacion`
- `/favoritos`

## Flujo recomendado de demo

1. Ingresar a Home.
2. Navegar a Galería y revisar el filtro dinámico.
3. Ir a detalle de una publicación.
4. Registrarse o iniciar sesión.
5. Entrar a Perfil.
6. Revisar Mis publicaciones.
7. Crear una publicación nueva.
8. Revisar Favoritos.
