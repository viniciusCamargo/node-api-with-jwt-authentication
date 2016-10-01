const express = require('express')
const router  = express.Router()

let User = require('../models/user')

router.get('/', (req, res) => {
  console.log('routes/users')

  User.find({}, (err, users) => {
    if (err)
      res.send(err)

    res.json(users)
  })
})

module.exports = router
