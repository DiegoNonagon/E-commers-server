import usersManager from "../../data/fs/users.manager.js";

async function getAllUsers(req, res, next) {
  try {
    const response = await usersManager.readAll();
    if (response.length > 0) {
      return res.status(200).json({ message: "USERS READ", response });
    } else {
      const error = new Error("NOT FOUND USERS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("NOT FOUND USER");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createGet(req, res, next) {
  try {
    const { name, email, password, photo, roll } = req.params;
    let { age, address, isOnline } = req.query;
    if (!age) {
      age = "none";
    }
    if (!address) {
      address = "none";
    }
    if (!isOnline) {
      isOnline = "none";
    }
    const response = await usersManager.create({
      name,
      email,
      password,
      photo,
      roll,
      age,
      address,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await usersManager.create(data);
    return res
      .status(201)
      .json({ message: "USER CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const responseManager = await usersManager.update(uid, newData);

    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "USER UPDATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);

    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "USER DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

const registerView = async (req, res, next) => {
  try {
    const users = await usersManager.readAll();
    return res.render("register", { users });
  } catch (error) {
    return next(error);
  }
};

const loginView = async (req, res, next) => {
  try {
    // Aquí puedes hacer alguna lectura de datos si fuera necesario,
    // en este caso no se requiere, pero sigue la misma lógica del register
    return res.render("login");
  } catch (error) {
    return next(error);
  }
};

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.validateUser(email, password);
    if (user) {
      req.session.user = user; // Almacena el usuario en la sesión
      return res.redirect("/users/dashboard"); // Redirige al dashboard
    } else {
      return res.status(401).render("login", { error: "Invalid credentials" }); // Muestra el error
    }
  } catch (error) {
    return next(error);
  }
};

const dashboardView = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Redirige si no está autenticado
  }

  const user = req.session.user; // Obtén el usuario de la sesión
  return res.render("dashboard", { user }); // Renderiza el dashboard con el usuario
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/users/dashboard"); // O redirige a donde prefieras
    }
    res.clearCookie("connect.sid"); // Asegúrate de que coincide con tu cookie
    res.redirect("/users/login"); // Redirige al login después de cerrar sesión
  });
};

export {
  getAllUsers,
  getUser,
  createGet,
  createUser,
  updateUser,
  destroyUser,
  registerView,
  loginView,
  validateUser,
  dashboardView,
  logout,
};
