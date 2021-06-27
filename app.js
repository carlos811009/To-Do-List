const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')
const app = express()
const db = require('./models/index')

const PORT = process.env.PORT || 3000


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})


require('./routes')(app, passport)

app.listen(PORT, () => {
  console.log(`the web is runnung on http://localhost:${PORT}`)
})