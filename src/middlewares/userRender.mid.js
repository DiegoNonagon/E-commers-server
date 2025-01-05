function userRender(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

export default userRender;
