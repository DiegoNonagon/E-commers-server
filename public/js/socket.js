document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const form = document.getElementById("registerForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      photo: formData.get("photo"), // URL de la foto de perfil
    };

    // Emitir los datos del usuario al servidor
    socket.emit("new user", userData);

    // Manejar las respuestas del servidor
    socket.on("registrationSuccess", (message) => {
      responseMessage.textContent = message;
      responseMessage.style.color = "green";
    });

    form.reset();

    socket.on("registrationError", (errorMessage) => {
      responseMessage.textContent = errorMessage;
      responseMessage.style.color = "red";
    });
  });

  // Escuchar actualizaciones de usuarios
  socket.on("update users", (allUsers) => {
    console.log("Usuarios actualizados: ", allUsers);
  });
});
