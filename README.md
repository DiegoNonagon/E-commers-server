### Documentación del Secon challenge: Implementación de Registro, Login y Gestión de Productos

---

#### **1. Introducción**

Este proyecto es una aplicación web donde los usuarios pueden registrarse, iniciar sesión y gestionar productos. Utiliza tecnologías como `Express`, `Socket.IO`, `Handlebars`, y el sistema de archivos (`File System`) para manejar la creación, actualización y visualización de productos y usuarios.

---

#### **2. Estructura del Proyecto**

El proyecto está organizado de la siguiente manera:

```
- src/
  - controllers/
    - fs/
      - users.controller.js
      - products.controller.js
  - data/
    - fs/
      - users.manager.js
      - products.manager.js
  - middlewares/
    - errorHandler.mid.js
    - pathHandler.mid.js
    - userRender.mid.js
  - routers/
    - index.router.js
    - usersView.router.js
    - index.socket.js
  - views/
    - layouts/
      - main.handlebars
    - login.handlebars
    - register.handlebars
    - products.handlebars
    - dashboard.handlebars
  - public/
    - css/
    - js/
  - utils.js
- server.js
```

---

#### **3. Registro de Usuarios**

##### **3.1. Estructura de Usuario**
Cada usuario tiene los siguientes atributos:

- **name**: Nombre del usuario.
- **email**: Correo electrónico del usuario.
- **password**: Contraseña del usuario (sin cifrar en este ejemplo).
- **photo**: URL de la foto del usuario.

##### **3.2. Vista de Registro (`register.handlebars`)**

El formulario para registrar un nuevo usuario tiene los campos `name`, `email`, `password`, y `photo`. Usa Bootstrap para estilizar el formulario y Socket.IO para la comunicación en tiempo real.

```html
<form id="registerForm">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" required>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" required>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" required>
  </div>
  <div class="mb-3">
    <label for="photo" class="form-label">Photo URL</label>
    <input type="text" class="form-control" id="photo" name="photo" required>
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
```

##### **3.3. Controlador de Registro (`users.controller.js`)**

El controlador para registrar un nuevo usuario es responsable de verificar si el correo electrónico ya está en uso y, si no lo está, crear el nuevo usuario y emitir un evento de actualización de usuarios a todos los clientes conectados mediante Socket.IO.

```javascript
const registerView = async (req, res, next) => {
  try {
    const users = await usersManager.readAll();
    return res.render("register", { users });
  } catch (error) {
    return next(error);
  }
};
```

##### **3.4. Socket.IO para Registro**

```javascript
socket.on("new user", async (data) => {
  // Verificación y creación del usuario
});
```

---

#### **4. Login de Usuarios**

##### **4.1. Vista de Login (`login.handlebars`)**

```html
<form id="loginForm">
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" required>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" required>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
```

##### **4.2. Controlador de Login**

```javascript
const loginView = async (req, res, next) => {
  try {
    const users = await usersManager.readAll();
    return res.render("login", { users });
  } catch (error) {
    return next(error);
  }
};
```

Cuando el usuario se loguea correctamente, se redirige al **dashboard** donde puede ver y gestionar productos.

---

#### **5. Gestión de Productos**

##### **5.1. Estructura de Producto**
Cada producto tiene los siguientes atributos:

- **title**: Nombre del producto.
- **price**: Precio del producto.
- **stock**: Cantidad disponible.
- **category**: Categoría del producto.
- **photo**: URL de la foto del producto.

##### **5.2. Vista de Creación de Producto (`products.handlebars`)**

```html
<form id="productForm">
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="title" name="title" required>
  </div>
  <div class="mb-3">
    <label for="price" class="form-label">Price</label>
    <input type="number" class="form-control" id="price" name="price" required>
  </div>
  <div class="mb-3">
    <label for="stock" class="form-label">Stock</label>
    <input type="number" class="form-control" id="stock" name="stock" required>
  </div>
  <div class="mb-3">
    <label for="category" class="form-label">Category</label>
    <input type="text" class="form-control" id="category" name="category" required>
  </div>
  <div class="mb-3">
    <label for="photo" class="form-label">Photo URL</label>
    <input type="text" class="form-control" id="photo" name="photo" required>
  </div>
  <button type="submit" class="btn btn-primary">Create Product</button>
</form>
```

##### **5.3. Controladores de Productos**

El controlador de productos tiene métodos para leer, crear, actualizar y eliminar productos utilizando `products.manager.js`.

```javascript
async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await productsManager.create(data);
    return res.status(201).json({ message: "PRODUCT CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}
```

##### **5.4. Socket.IO para la Creación de Productos**

Al crear un nuevo producto, el cliente envía los datos a través de un socket que los maneja en el backend, emitiendo un evento para actualizar la lista de productos.

```javascript
socket.on("new product", async (data) => {
  // Verificación y creación del producto
});
```

---

#### **6. Sesiones y Logout**

##### **6.1. Middleware de Usuario**
Este middleware permite que los datos del usuario estén disponibles en todas las vistas, lo que facilita mostrar el nombre del usuario en el `navbar` cuando está autenticado.

```javascript
server.use(userRender);
```

##### **6.2. Controlador de Logout**

```javascript
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout Error");
    res.redirect("/users/login");
  });
};
```

---

#### **7. Conclusión**

Este proyecto cubre la gestión completa de usuarios y productos utilizando Handlebars para la visualización, Socket.IO para la interacción en tiempo real y el sistema de archivos (`fs`) para el almacenamiento de datos. La estructura modular del código facilita la escalabilidad y mantenimiento.
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
