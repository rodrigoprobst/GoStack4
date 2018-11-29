const Joi = require('joi')

module.exports = {
  // query: {},
  // params: {},
  body: {
    ad: Joi.string().required(),
    content: Joi.string().required()
  }
}
