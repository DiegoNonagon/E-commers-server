import usersManager from "../data/users.manager.js";

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
    let { age, address } = req.query;
    if (!age) {
      age = "none";
    }
    if (!address) {
      address = "none";
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

export { getAllUsers, getUser, createGet, createUser, updateUser, destroyUser };
