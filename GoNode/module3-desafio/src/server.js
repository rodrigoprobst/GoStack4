require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
const databaseconfig = require('./config/database')
const sentryconfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middleware()
    this.database()
    this.routes()
    this.sentry()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryconfig)
  }

  middleware () {
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(express.json())
  }

  database () {
    mongoose.connect(
      databaseconfig.uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
  }
  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
