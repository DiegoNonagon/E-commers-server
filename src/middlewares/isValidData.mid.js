function isValidData(req, res, next) {
  try {
    const { title, stock, price } = req.body;
    if (!title || !stock || !price) {
      const error = new Error("Title, Stock and Price are required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidData;
