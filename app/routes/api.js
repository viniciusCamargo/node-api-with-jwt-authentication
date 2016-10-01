const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const config  = require('../config')


router.get('/', (req, res, next) => {
  console.log('routes/api')

  // CHECK TOKEN
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      }

      else {
        req.decoded = decoded
        next()
      }
    })
  }

  else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
  // CHECK TOKEN

  res.send('Helloooooo from "routes/api"')
})

module.exports = router
