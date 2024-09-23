# E-commers-server

# Documentación del Servidor Node.js

## Introducción

Este documento describe un servidor construido con Node.js, que incluye la gestión de usuarios y productos. Se utilizaron los módulos de `Express.js` para el enrutamiento, `File System` para la persistencia de datos y `Postman` para probar las APIs. Además, se implementaron middlewares para la gestión de errores y la validación de datos.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
/Ecommers
  /src
    /controllers
      users.controller.js
      products.controller.js
    /routers
      api
        users.api.js
        products.api.js
    /data
      users.manager.js
      products.manager.js
    /middlewares
      isValidUserData.js
      isValidProductData.js
    server.js
  package.json
```

## Módulos Utilizados

- **Express.js**: Framework para crear aplicaciones web y APIs.
- **File System**: Módulo de Node.js para interactuar con el sistema de archivos.
- **Postman**: Herramienta para realizar pruebas de APIs.
- **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.

## Gestión de Usuarios

### 1. `users.manager.js`

Módulo que maneja las operaciones CRUD de usuarios utilizando el sistema de archivos.

#### Métodos:

- **readAll()**: Lee todos los usuarios.
- **read(id)**: Lee un usuario específico por ID.
- **create(data)**: Crea un nuevo usuario.
- **update(id, newData)**: Actualiza un usuario existente.
- **delete(id)**: Elimina un usuario.

### 2. `users.controller.js`

Controlador que maneja la lógica de negocio relacionada con usuarios.

#### Métodos:

- **getAllUsers(req, res, next)**: Recupera todos los usuarios.
- **getUser(req, res, next)**: Recupera un usuario específico.
- **createUser(req, res, next)**: Crea un nuevo usuario.
- **updateUser(req, res, next)**: Actualiza un usuario.
- **destroyUser(req, res, next)**: Elimina un usuario.

### 3. `users.api.js`

Define las rutas de la API para las operaciones de usuarios.

import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, destroyUser } from "../../controllers/users.controller.js";
import isValidUserData from "../../middlewares/isValidUserData.js";

const userRouter = Router();

userRouter.get("/api/users", getAllUsers);
userRouter.get("/api/users/:uid", getUser);
userRouter.post("/api/users", isValidUserData, createUser);
userRouter.put("/api/users/:uid", updateUser);
userRouter.delete("/api/users/:uid", destroyUser);

export default userRouter;

## Gestión de Productos

### 1. `products.manager.js`

Módulo que maneja las operaciones CRUD de productos utilizando el sistema de archivos.

#### Métodos:

- **readAll(category)**: Lee todos los productos o los de una categoría específica.
- **read(id)**: Lee un producto específico por ID.
- **create(data)**: Crea un nuevo producto.
- **update(id, newData)**: Actualiza un producto existente.
- **delete(id)**: Elimina un producto.

### 2. `products.controller.js`

Controlador que maneja la lógica de negocio relacionada con productos.

#### Métodos:

- **getAllProducts(req, res, next)**: Recupera todos los productos.
- **getProduct(req, res, next)**: Recupera un producto específico.
- **createProduct(req, res, next)**: Crea un nuevo producto.
- **updateProduct(req, res, next)**: Actualiza un producto.
- **destroyProduct(req, res, next)**: Elimina un producto.

### 3. `products.api.js`

Define las rutas de la API para las operaciones de productos.

import { Router } from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, destroyProduct } from "../../controllers/products.controller.js";
import isValidProductData from "../../middlewares/isValidProductData.js";

const productRouter = Router();

productRouter.get("/api/products", getAllProducts);
productRouter.get("/api/products/:pid", getProduct);
productRouter.post("/api/products", isValidProductData, createProduct);
productRouter.put("/api/products/:pid", updateProduct);
productRouter.delete("/api/products/:pid", destroyProduct);

export default productRouter;

## Middlewares

### 1. `isValidUserData.js`

Middleware que valida los datos de un usuario antes de que sean procesados por el controlador.

### 2. `isValidProductData.js`

Middleware que valida los datos de un producto antes de que sean procesados por el controlador.

## Gestión de Errores

Se implementó un middleware para gestionar errores globalmente y proporcionar respuestas más claras al cliente.

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

## Pruebas con Postman

Se utilizó Postman para probar las diferentes rutas de la API. Algunas de las pruebas incluyen:

- **GET /api/users**: Recuperar todos los usuarios.
- **POST /api/users**: Crear un nuevo usuario con datos válidos.
- **GET /api/products**: Recuperar todos los productos.
- **POST /api/products**: Crear un nuevo producto con datos válidos.

## Conclusiones

Este proyecto proporciona una base sólida para la gestión de usuarios y productos utilizando Node.js. Se implementaron buenas prácticas de desarrollo, como la validación de datos y la gestión de errores, lo que mejora la robustez de la aplicación.
