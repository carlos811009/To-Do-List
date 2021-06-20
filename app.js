const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const db = require('./models/index')
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.listen(PORT, () => {
  console.log(`the web is runnung on http://localhost:${PORT}`)
})