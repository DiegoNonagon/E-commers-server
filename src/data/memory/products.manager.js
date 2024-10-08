import crypto from "crypto";

class ProductsManager {
  constructor() {
    // Inicializamos un arreglo en memoria para almacenar los productos
    this.products = [];
  }

  async readAll() {
    try {
      return this.products; // Devuelve todos los productos en memoria
    } catch (error) {
      console.error("Error reading all products:", error);
      throw error;
    }
  }

  async read(id) {
    try {
      const product = this.products.find((product) => product.id === id);
      return product || null; // Devuelve null si no se encuentra
    } catch (error) {
      console.error("Error reading product:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      this.products.push(data);
      return data.id; // Devuelve el ID del nuevo producto
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const index = this.products.findIndex((product) => product.id === id);
      if (index === -1) {
        return null; // Producto no encontrado
      }
      // Actualiza el producto
      this.products[index] = { ...this.products[index], ...newData };
      return this.products[index]; // Devuelve el producto actualizado
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const filteredProducts = this.products.filter(
        (product) => product.id !== id
      );
      if (this.products.length === filteredProducts.length) {
        return null; // Producto no encontrado
      }
      this.products = filteredProducts; // Actualiza la lista de productos
      return `Product with id ${id} deleted`; // Mensaje de confirmación
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

// Exportamos la clase para su uso en otras partes de la aplicación
const productsManager = new ProductsManager();
export default productsManager;
