function ensureAuthenticated(req) {
  return req.isAuthenticated()
}

function getUser(req) {
  if (req.user) {
    let user = req.user.dataValues ? req.user.toJSON() : req.user
    return user
  }
}

module.exports = {
  ensureAuthenticated,
  getUser
}
