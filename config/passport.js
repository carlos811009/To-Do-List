const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User

passport.use(new LocalStrategy(
  {
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, name, password, done) => {
    User.findOne({ where: { name: name } })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_messages', "沒有這個使用者"))
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, req.flash('error_messages', "密碼錯誤"))
        }
        console.log('成功')
        return done(null, user)
      })
  }

))


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return done(null, user)
  })
})

module.exports = passport