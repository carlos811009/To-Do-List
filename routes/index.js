const toDoController = require('../controllers/toDoController')
const userController = require('../controllers/userController')

module.exports = (app) => {

  app.get('/', toDoController.getList)
  app.post('/todos/add', toDoController.addList)
  app.delete('/todos/deleteList', toDoController.deleteList)
  app.delete('/todos/deleteFinish', toDoController.deleteFinish)
  app.delete('/todos/deleteTrash', toDoController.deleteTrash)
  app.post('/todos/:id/trash', toDoController.trashList)
  app.post('/todos/:id/reback', toDoController.rebackList)
  app.post('/todos/:id/finish', toDoController.finishList)
  app.post('/todos/:id/cancelCheck', toDoController.cancelCheck)



  app.get('/login', (req, res) => {
    res.render('login')
  })
  app.get('/register', (req, res) => {
    res.render('register')
  })
}