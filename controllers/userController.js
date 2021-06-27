const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User


const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  loginPage: (req, res) => {
    res.render('login')
  },
  register: async (req, res) => {

    const { name, password, confirmPassword
    } = req.body
    if (!name || !password || !confirmPassword) {
      req.flash('error_messages', "所有欄位皆必填")
      return res.redirect('/register')
    }
    if (password !== confirmPassword) {
      req.flash('error_messages', "請確認密碼一致")
      return res.redirect('/register')
    }
    User.findOne({
      where: { name: name },
    })
      .then(user => {
        if (user) {
          res.redirect('/register')
        } else {
          User.create({
            name: name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
          })
            .then(() => {
              req.flash('success_messages', "感謝註冊 , 歡迎使用MyTODO , 請先登入")
              res.redirect('/login')
            })
        }
      })

  },
  login: (req, res) => {
    req.flash('success_messages', `<strong>${req.user.name} 歡迎回來!!! </strong> `)
    res.redirect('/')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/login')
  }
}

module.exports = userController