const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const mongoose   = require('mongoose')
// const jwt        = require('jsonwebtoken')

const config     = require('./app/config')

// let User = require('./app/models/user')

let Routes = {
  api: require('./app/routes/api'),
  users: require('./app/routes/users'),
  authenticate: require('./app/routes/authenticate')
}

mongoose.connect(config.database)
mongoose.Promise = global.Promise

app.set('secret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/', Routes.api)
app.use('/users', Routes.users)
app.use('/authenticate', Routes.authenticate)

app.listen(config.port)
