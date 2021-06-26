const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')
module.exports = (app) => {
  app.get('/', toDoController.getToDO)

  app.get('/login', (req, res) => {
    res.render('login')
  })
  app.get('/register', (req, res) => {
    res.render('register')
  })
}