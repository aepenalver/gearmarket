# 06B · Contratos de servicios API REST

## Auth

### POST `/api/v1/auth/register`
**Request**
```json
{
  "name": "Daniel",
  "email": "daniel@mail.com",
  "password": "123456"
}
```

**Response 201**
```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "name": "Daniel",
    "email": "daniel@mail.com"
  }
}
```

### POST `/api/v1/auth/login`
**Request**
```json
{
  "email": "daniel@mail.com",
  "password": "123456"
}
```

**Response 200**
```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Daniel",
    "email": "daniel@mail.com"
  }
}
```

## Publications

### GET `/api/v1/publications`
**Response 200**
```json
[
  {
    "id": 1,
    "title": "Bicicleta Trek",
    "price": 520000,
    "category": "ciclismo",
    "image_url": "https://...",
    "location": "Valparaíso"
  }
]
```

### GET `/api/v1/publications/:id`
**Response 200**
```json
{
  "id": 1,
  "title": "Bicicleta Trek",
  "description": "Excelente estado",
  "price": 520000,
  "category": "ciclismo",
  "image_url": "https://...",
  "location": "Valparaíso",
  "seller": {
    "id": 4,
    "name": "Camila"
  }
}
```

### POST `/api/v1/publications`
**Request**
```json
{
  "title": "Bicicleta Trek",
  "description": "Excelente estado",
  "price": 520000,
  "image_url": "https://...",
  "category": "ciclismo",
  "location": "Valparaíso"
}
```

**Response 201**
```json
{
  "message": "Publicación creada correctamente",
  "publication_id": 10
}
```

### PUT `/api/v1/publications/:id`
**Request**
```json
{
  "title": "Bicicleta Trek Marlin 7",
  "price": 550000
}
```

**Response 200**
```json
{
  "message": "Publicación actualizada correctamente"
}
```

### DELETE `/api/v1/publications/:id`
**Response 200**
```json
{
  "message": "Publicación eliminada correctamente"
}
```

## Favorites

### GET `/api/v1/favorites`
**Response 200**
```json
[
  {
    "id": 3,
    "publication_id": 10,
    "title": "Bicicleta Trek"
  }
]
```

### POST `/api/v1/favorites`
**Request**
```json
{
  "publication_id": 10
}
```

**Response 201**
```json
{
  "message": "Favorito agregado"
}
```

### DELETE `/api/v1/favorites/:publicationId`
**Response 200**
```json
{
  "message": "Favorito eliminado"
}
```

## Messages

### POST `/api/v1/messages`
**Request**
```json
{
  "publication_id": 10,
  "receiver_id": 4,
  "message": "Hola, ¿sigue disponible?"
}
```

**Response 201**
```json
{
  "message": "Mensaje enviado correctamente"
}
```

## Profile

### GET `/api/v1/profile`
**Response 200**
```json
{
  "id": 1,
  "name": "Daniel",
  "email": "daniel@mail.com",
  "avatar": null
}
```
