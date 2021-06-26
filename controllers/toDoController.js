const db = require('../models')
const List = db.List

const months = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月".split(",")
const toDoController = {
  getList: (req, res) => {
    List.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(lists => {
        lists = lists.map(list => ({
          name: list.dataValues.name,
          time: `${list.createdAt.getFullYear()} - ${months[list.createdAt.getMonth()]} / ${list.createdAt.getDate()}日`
        }))
        res.render('index', { lists })
      })
  },

  addList: (req, res) => {
    List.create({
      name: req.body.newList
    })
      .then(() => res.redirect('/'))
  },

  removeAllList: (req, res) => {
    List.findAll()
      .then(lists => {
        lists.forEach(list => list.destroy());
        return res.redirect('/')
      })
  }

}

module.exports = toDoController