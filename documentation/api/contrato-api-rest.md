# Contrato de datos API REST

## Base URL

`/api/v1`

## Autenticación

Las rutas privadas utilizarán JWT en header:
`Authorization: Bearer <token>`

---

## 1. Registro de usuario

### POST /users

### Request

```json
{
  "name": "User Name",
  "email": "user@mail.com",
  "password": "123456",
  "phone": "+56911111111",
  "city": "Santiago"
}
```

### Response 201

```json
{
  "message": "Usuario creado correctamente",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@mail.com"
  }
}
```

---

## 2. Inicio de sesión

### POST /auth/login

### Request

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

### Response 200

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@mail.com"
  }
}
```

---

## 3. Perfil de usuario

### GET /users/profile

### Response 200

```json
{
  "id": 1,
  "name": "User Name",
  "email": "user@mail.com",
  "phone": "+56911111111",
  "city": "Santiago",
  "avatar_url": null
}
```

---

## 4. Listar publicaciones

### GET /publications

### Query params opcionales

- category
- minPrice
- maxPrice
- location
- search

### Response 200

```json
[
  {
    "id": 10,
    "title": "Bicicleta MTB Trek",
    "price": 420000,
    "location": "La Florida",
    "image_url": "https://...",
    "category": "ciclismo",
    "seller": "Seller Name"
  }
]
```

---

## 5. Detalle de publicación

### GET /publications/:id

### Response 200

```json
{
  "id": 10,
  "title": "Bicicleta MTB Trek",
  "description": "Muy buen estado, aro 29",
  "price": 420000,
  "condition": "usado",
  "location": "La Florida",
  "image_url": "https://...",
  "category": {
    "id": 2,
    "name": "ciclismo"
  },
  "seller": {
    "id": 3,
    "name": "Seller Name",
    "city": "Santiago"
  }
}
```

---

## 6. Crear publicación

### POST /publications

### Request

```json
{
  "category_id": 2,
  "title": "Bicicleta MTB Trek",
  "description": "Muy buen estado, aro 29",
  "price": 420000,
  "condition": "usado",
  "location": "La Florida",
  "image_url": "https://..."
}
```

### Response 201

```json
{
  "message": "Publicación creada correctamente",
  "publication_id": 10
}
```

---

## 7. Favoritos

### POST /favorites

### Request

```json
{
  "publication_id": 10
}
```

### Response 201

```json
{
  "message": "Favorito agregado correctamente"
}
```

### GET /favorites

### Response 200

```json
[
  {
    "publication_id": 10,
    "title": "Bicicleta MTB Trek",
    "price": 420000,
    "image_url": "https://..."
  }
]
```

---

## 8. Mensajes al vendedor

### POST /messages

### Request

```json
{
  "publication_id": 10,
  "receiver_user_id": 3,
  "message": "Hola, ¿sigue disponible?"
}
```

### Response 201

```json
{
  "message": "Mensaje enviado correctamente"
}
```
