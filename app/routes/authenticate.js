const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const config  = require('../config')

let User = require('../models/user')

router.post('/', (req, res) => {
  console.log('routes/authenticate')
  console.log(req.body)

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err)
      // throw err
      res.send(err)

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      })
    }

    else if (user) {
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
      }

      else {
        let jwtOptions = {
          expiresIn: '24h'
        }

        let token = jwt.sign(user, config.secret, jwtOptions)

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
  })
})

module.exports = router
