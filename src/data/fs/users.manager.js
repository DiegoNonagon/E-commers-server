import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  exists() {
    // Verifica si el archivo existe y lo crea si no
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("File created");
    } else {
      console.log("File already exists");
    }
  }

  async readAll(role) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      if (role) {
        const filterData = parseData.filter((each) => each.role === role);
        return filterData;
      } else {
        return parseData;
      }
    } catch (error) {
      console.error("Error reading all users:", error);
      throw error;
    }
  }

  async read(id) {
    try {
      const allUsers = await this.readAll();
      const user = allUsers.find((user) => user.id === id);
      return user || null; // Devuelve null si no se encuentra
    } catch (error) {
      console.error("Error reading user:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const allUsers = await this.readAll();
      allUsers.push(data);
      const stringAll = JSON.stringify(allUsers, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const allUsers = await this.readAll();
      const index = allUsers.findIndex((user) => user.id === id);
      if (index === -1) {
        return null; // Usuario no encontrado
      }
      // Actualiza el usuario
      allUsers[index] = { ...allUsers[index], ...newData };
      const stringAll = JSON.stringify(allUsers, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return allUsers[index]; // Devuelve el usuario actualizado
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const allUsers = await this.readAll();
      const filteredUsers = allUsers.filter((user) => user.id !== id);
      if (allUsers.length === filteredUsers.length) {
        return null; // Usuario no encontrado
      }
      const stringAll = JSON.stringify(filteredUsers, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return `User with id ${id} deleted`; // Mensaje de confirmación
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async validateUser(email, password) {
    try {
      const allUsers = await this.readAll();
      const user = allUsers.find(
        (user) => user.email === email && user.password === password
      );
      return user ? user : null; // Devuelve el usuario si las credenciales son correctas
    } catch (error) {
      console.error("Error validating user:", error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;
