document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  // Formulario de registro
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    const responseMessage = document.getElementById("responseMessage");

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);

      const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        photo: formData.get("photo"), // URL de la foto de perfil
      };

      socket.emit("new user", userData);

      socket.on("registrationSuccess", (message) => {
        responseMessage.textContent = message;
        responseMessage.style.color = "green";
      });

      registerForm.reset();

      socket.on("registrationError", (errorMessage) => {
        responseMessage.textContent = errorMessage;
        responseMessage.style.color = "red";
      });
    });
  }

  // Formulario de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.password.value;

      socket.emit("login user", { email, password });

      socket.on("loginSuccess", (message) => {
        alert(message);
        window.location.href = "/users/dashboard";
      });

      socket.on("loginError", (errorMessage) => {
        alert(errorMessage);
      });
    });
  }
});
