const isAdminMiddleware = (req, res, next) => {
  console.log(req.session.isAdmin)
  if (req.session && req.session.isAdmin === true) {
    next();
  } else {
    res.render('404', { message: 'Access Denied', title: 'Access Denied', errcode: '403' });
  };
}

module.exports = isAdminMiddleware;
