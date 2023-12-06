const isAdminMiddleware = (req, res, next) => {
    if (req.session && req.session.isAdmin === true) {
      next();
    } else {
      res.render('404', {message: 'Access Denied', title: 'Access Denied', errcode: '403'});
    }
  };

module.exports = isAdminMiddleware