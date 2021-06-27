const { authenticate } = require('passport')
const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {

  const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

  app.get('/', authenticate, toDoController.getList)
  app.post('/todos/add', authenticate, toDoController.addList)
  app.delete('/todos/deleteList', authenticate, toDoController.deleteList)
  app.delete('/todos/deleteFinish', authenticate, toDoController.deleteFinish)
  app.delete('/todos/deleteTrash', authenticate, toDoController.deleteTrash)
  app.post('/todos/:id/trash', authenticate, toDoController.trashList)
  app.post('/todos/:id/reback', authenticate, toDoController.rebackList)
  app.post('/todos/:id/finish', authenticate, toDoController.finishList)
  app.post('/todos/:id/cancelCheck', authenticate, toDoController.cancelCheck)



  app.get('/login', userController.loginPage)
  app.get('/register', userController.registerPage)
  app.post('/register', userController.register, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
}