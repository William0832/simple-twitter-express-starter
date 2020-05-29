const express = require('express')
const helpers = require('./_helpers');
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors()) // cors 的預設為全開放
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
