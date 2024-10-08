function userRender(req, res, next) {
  res.locals.user = req.session.user || null; // Inyecta el usuario en todas las vistas
  next(error);
}

export default userRender;
