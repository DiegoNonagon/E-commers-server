import usersMongoManager from "../../data/mongo/managers/user.manager.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await usersMongoManager.create(data);
    return res
      .status(201)
      .json({ message: "USER CREATED", response: response._id });
  } catch (error) {
    return next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const response = await usersMongoManager.readAll(filter);
    if (response.length > 0) {
      return res.status(200).json({ message: "USERS READ", response });
    } else {
      const error = new Error("USERS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const read = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await usersMongoManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await usersMongoManager.update(uid, data);
    if (response) {
      return res.status(200).json({ message: "USER UPDATE", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await usersMongoManager.destroy(uid);
    if (response) {
      return res.status(200).json({ message: "USER DELETED", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

export { create, readAll, read, update, destroy };
