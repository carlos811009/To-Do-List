const db = require('../models')
const List = db.List

const months = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月".split(",")
const toDoController = {
  getList: (req, res) => {
    List.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
      .then(lists => {
        if (lists) {
          lists = lists.map(list => ({
            id: list.id,
            name: list.dataValues.name,
            time: `${list.createdAt.getFullYear()} - ${months[list.createdAt.getMonth()]} / ${list.createdAt.getDate()}日`,
            isTrashed: list.isTrashed,
            isFinished: list.isFinished,
          }))
          return res.render('index', { lists })
        }
        return res.render('index')
      })
  },

  addList: (req, res) => {
    if (req.body.newList && req.body.newList.trim() !== '') {
      List.create({
        name: req.body.newList,
        isTrashed: false,
        isFinished: false,
        UserId: req.user.id
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

  deleteList: (req, res) => {
    List.destroy({
      where: {
        isFinished: false,
        isTrashed: false
      }
    })
      .then(() => {
        req.flash('error_messages', "已刪除List欄位")
        return res.redirect('/')
      })
  },

  deleteFinish: (req, res) => {
    List.destroy({
      where: {
        isFinished: true,
        isTrashed: false
      }
    })
      .then(() => {
        req.flash('error_messages', "已刪除Finish欄位")
        return res.redirect('/')
      })
  },

  deleteTrash: (req, res) => {
    List.destroy({
      where: {
        isTrashed: true
      }
    })
      .then(() => {
        req.flash('error_messages', "已刪除Trash欄位")
        return res.redirect('/')
      })
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
  },
  rebackList: (req, res) => {
    List.findByPk(req.params.id)
      .then(list => {
        list.update({
          name: list.name,
          time: list.time,
          isTrashed: false,
          isFinish: list.isFinished
        })
          .then(() => res.redirect('/'))
      })
  },
  finishList: (req, res) => {
    List.findByPk(req.params.id)
      .then(list => {
        list.update({
          name: list.name,
          time: list.time,
          isTrashed: list.isTrashed,
          isFinished: true,
        })
          .then(() => res.redirect('/'))
      })
  },
  cancelCheck: (req, res) => {
    List.findByPk(req.params.id)
      .then(list => {
        list.update({
          name: list.name,
          time: list.time,
          isTrashed: list.isTrashed,
          isFinished: false,
        })
          .then(() => res.redirect('/'))
      })
  },

}

module.exports = toDoController