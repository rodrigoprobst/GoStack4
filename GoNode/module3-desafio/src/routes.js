const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

// create new user
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

// create session
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// use authMiddleware from here
routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */
routes.get('/purchase/:id', handle(controllers.PurchaseController.show))
routes.post(
  '/purchase',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.request)
)
routes.put('/purchase/:id', handle(controllers.PurchaseController.accept))

module.exports = routes
