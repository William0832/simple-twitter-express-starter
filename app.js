const express = require('express')
const helpers = require('./_helpers');
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors()) // cors 的預設為全開放
const bodyParser = require('body-parser')
const session = require('express-session')

const flash = require('connect-flash')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const passport = require('./config/passport')
app.locals.moment = require('moment') //let moment function available in pug templates

// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

//middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/upload', express.static(__dirname + '/upload')) //img url
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = helpers.getUser(req)
  next()
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./routes')(app)

module.exports = app