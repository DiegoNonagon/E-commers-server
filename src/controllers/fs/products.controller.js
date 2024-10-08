import productsManager from "../../data/fs/products.manager.js";

async function getAllProducts(req, res, next) {
  try {
    const { category } = req.query;
    let response;

    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }

    if (response.length > 0) {
      return res.status(200).json({ message: "PRODUCTS READ", response });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);

    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createGet(req, res, next) {
  try {
    const { title, price, stock } = req.params;
    let { category, photo } = req.query;
    if (!category) {
      category = "none";
    }
    if (!photo) {
      photo = "none";
    }
    const response = await productsManager.create({
      title,
      price,
      stock,
      category,
      photo,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = req.body;

    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const responseManager = await productsManager.update(pid, newData);

    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "PRODUCT UPDATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);

    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "PRODUCT DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function showProducts(req, res, next) {
  try {
    let { category } = req.query;
    let all;
    if (!category) {
      all = await productsManager.readAll();
    } else {
      all = await productsManager.readAll(category);
    }
    if (all.length > 0) {
      return res.render("products", { products: all });
      // render habilita de forma opcional un segundo parametro
      // para enviar datos a la plantilla de handlebars
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function showOneProduct(req, res, next) {
  // res es el objeto de respuesta a enviar al cliente
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    // response es la respuesta que se espera del manager (para leer un producto)
    if (response) {
      return res.render("oneproduct", { one: response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export {
  getAllProducts,
  getProduct,
  createGet,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts,
  showOneProduct,
};
