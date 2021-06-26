const db = require('../models')
const List = db.List

const months = "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(",")
const toDoController = {
  getToDO: (req, res) => {
    List.findAll({})
      .then(lists => {
        lists = lists.map(list => ({
          name: list.dataValues.name,
          time: `${list.createdAt.getFullYear()} - ${months[list.createdAt.getMonth()]} / ${list.createdAt.getDate()}`
        }))
        res.render('index', { lists })
      })
  },

  addToDo: (req, res) => {

  }
}

module.exports = toDoController