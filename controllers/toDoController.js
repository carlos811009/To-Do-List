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
          id: list.id,
          name: list.dataValues.name,
          time: `${list.createdAt.getFullYear()} - ${months[list.createdAt.getMonth()]} / ${list.createdAt.getDate()}日`,
          isTrashed: list.isTrashed,
          isFinished: list.isFinished,
        }))
        res.render('index', { lists })
      })
  },

  addList: (req, res) => {
    if (req.body.newList && req.body.newList.trim() !== '') {
      List.create({
        name: req.body.newList,
        isTrashed: false,
        isFinished: false,
      })
        .then((list) => {
          req.flash('success_messages', '創建成功')
          return res.redirect('/')
        }
        )
    } else {
      req.flash('error_messages', '請輸入名稱')
      return res.redirect('/')
    }
  },

  removeAllList: (req, res) => {
    List.destroy({
      where: {},
      truncate: true
    })
      .then(() => res.redirect('/'))
  },

  trashList: (req, res) => {
    List.findByPk(req.params.id)
      .then(list => {
        list.update({
          name: list.name,
          time: list.time,
          isTrashed: true,
          isFinish: list.isFinished
        })
          .then(() => res.redirect('/'))
      })
  }

}

module.exports = toDoController