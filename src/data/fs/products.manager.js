import fs from "fs";
import crypto from "crypto";

class ProductsManager {
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

  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parsedData = JSON.parse(data);

      // Filtra por categoría si se proporciona
      if (category) {
        return parsedData.filter((product) => product.category === category);
      } else {
        return parsedData;
      }
    } catch (error) {
      console.error("Error reading all products:", error);
      throw error;
    }
  }

  async read(id) {
    try {
      const allProducts = await this.readAll();
      const product = allProducts.find((product) => product.id === id);
      return product || null; // Devuelve null si no se encuentra
    } catch (error) {
      console.error("Error reading product:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const allProducts = await this.readAll();
      allProducts.push(data);
      const stringAll = JSON.stringify(allProducts, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id; // Devuelve el ID del nuevo producto
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const allProducts = await this.readAll();
      const index = allProducts.findIndex((product) => product.id === id);
      if (index === -1) {
        return null; // Producto no encontrado
      }
      // Actualiza el producto
      allProducts[index] = { ...allProducts[index], ...newData };
      const stringAll = JSON.stringify(allProducts, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return allProducts[index]; // Devuelve el producto actualizado
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const allProducts = await this.readAll();
      const filteredProducts = allProducts.filter(
        (product) => product.id !== id
      );
      if (allProducts.length === filteredProducts.length) {
        return null; // Producto no encontrado
      }
      const stringAll = JSON.stringify(filteredProducts, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return `Product with id ${id} deleted`; // Mensaje de confirmación
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/files/products.json");
export default productsManager;
