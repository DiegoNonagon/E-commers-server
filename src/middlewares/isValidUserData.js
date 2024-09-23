function isValidUserData(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = new Error("Name, Mail and Password are required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidUserData;
