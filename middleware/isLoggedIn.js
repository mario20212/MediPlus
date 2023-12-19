function isLoggedIn(req, res, next) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.redirect('/signinup');
    }
  }
  
  module.exports = isLoggedIn;
  