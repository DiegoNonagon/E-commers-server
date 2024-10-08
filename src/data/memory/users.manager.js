import crypto from "crypto";

class UsersManager {
  constructor() {
    // Inicializamos un objeto en memoria para almacenar los usuarios
    this.users = [];
  }

  async readAll() {
    try {
      return this.users; // Devuelve todos los usuarios en memoria
    } catch (error) {
      console.error("Error reading all users:", error);
      throw error;
    }
  }

  async read(id) {
    try {
      const user = this.users.find((user) => user.id === id);
      return user || null; // Devuelve null si no se encuentra
    } catch (error) {
      console.error("Error reading user:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      this.users.push(data);
      return data.id; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const index = this.users.findIndex((user) => user.id === id);
      if (index === -1) {
        return null; // Usuario no encontrado
      }
      // Actualiza el usuario
      this.users[index] = { ...this.users[index], ...newData };
      return this.users[index]; // Devuelve el usuario actualizado
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const filteredUsers = this.users.filter((user) => user.id !== id);
      if (this.users.length === filteredUsers.length) {
        return null; // Usuario no encontrado
      }
      this.users = filteredUsers; // Actualiza la lista de usuarios
      return `User with id ${id} deleted`; // Mensaje de confirmación
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

// Exportamos la clase para su uso en otras partes de la aplicación
const usersManager = new UsersManager();

export default usersManager;
