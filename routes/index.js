let apis = require('./apis')

module.exports = (app) => {
  app.use('/', apis)
  app.use('/api', apis)
}
