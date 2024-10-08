import usersManager from "../data/fs/users.manager.js";

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
          password: data.password, // Puedes encriptar la contraseña aquí
          photo: data.photo, // Guardar la URL de la foto
        });

        const updatedUsers = await usersManager.readAll();
        socket.emit("registrationSuccess", "Usuario registrado exitosamente.");
        socket.broadcast.emit("update users", updatedUsers); // Emitir actualización a otros usuarios
      }
    } catch (error) {
      console.error("Error registering new user:", error);
      socket.emit("registrationError", "Error en el registro de usuario.");
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
};

export default socketCb;
