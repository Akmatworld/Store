function checkSession(req, res, next) {
  if (!req.session.login) {
      res.redirect('/sadmin/signin');
  } else {
      next();
  }
}

function checkSessionSignin (req, res, next) {
  if (!!req.session.login) {
      res.redirect(req.baseUrl + '/');
  } else {
      next();
  }
}

function returnObjectDataForTemplate({title = '', message = '', error = '', data = [], req} = {}) {
  return { title: title, message: message, baseUrl: req.baseUrl, login: req.session.login, date: new Date().getFullYear(), error: error, data: data };
}

module.exports = {
  checkSession,
  checkSessionSignin,
  returnObjectDataForTemplate
}