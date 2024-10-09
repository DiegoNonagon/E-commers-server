import usersManager from "../data/fs/users.manager.js";
import productsManager from "../data/fs/products.manager.js"; // Importa el productsManager

const socketCb = async (socket) => {
  console.log("socket connected id: " + socket.id);

  // Manejo de nuevo usuario
  socket.on("new user", async (data) => {
    try {
      const allUsers = await usersManager.readAll();
      const existingUser = allUsers.find((user) => user.email === data.email);

      if (existingUser) {
        socket.emit("registrationError", "El email ya está en uso.");
      } else {
        const userId = await usersManager.create({
          name: data.name,
          email: data.email,
          password: data.password,
          photo: data.photo,
        });

        const updatedUsers = await usersManager.readAll();
        socket.emit("registrationSuccess", "Usuario registrado exitosamente.");
        socket.broadcast.emit("update users", updatedUsers);
      }
    } catch (error) {
      console.error("Error registering new user:", error);
      socket.emit("registrationError", "Error en el registro de usuario.");
    }
  });

  // Manejo de nuevo producto
  socket.on("new product", async (productData) => {
    try {
      const newProductId = await productsManager.create(productData);
      const allProducts = await productsManager.readAll();

      // Emitir el nuevo producto a todos los clientes
      socket.emit("productCreated", {
        message: "Producto creado exitosamente",
        product: newProductId,
      });
      socket.broadcast.emit("update products", allProducts);
    } catch (error) {
      console.error("Error creando producto:", error);
      socket.emit("productError", "Error en la creación del producto.");
    }
  });

  // Envía la lista de usuarios cuando un cliente se conecta
  try {
    const allUsers = await usersManager.readAll();
    socket.emit("update users", allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    socket.emit("update users", []);
  }

  // Envía la lista de productos cuando un cliente se conecta
  try {
    const allProducts = await productsManager.readAll();
    socket.emit("update products", allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    socket.emit("update products", []);
  }

  // Manejo de eliminación de productos
  socket.on("delete product", async (productId) => {
    try {
      await productsManager.delete(productId);
      const allProducts = await productsManager.readAll();

      socket.emit("productDeleted", productId); // Emitir eliminación a todos
      socket.broadcast.emit("update products", allProducts); // Actualizar la lista en todos los clientes
    } catch (error) {
      console.error("Error eliminando producto:", error);
      socket.emit("productError", "Error al eliminar el producto.");
    }
  });
};

export default socketCb;
