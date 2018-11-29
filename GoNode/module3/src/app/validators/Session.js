const Joi = require('joi')

module.exports = {
  // query: {},
  // params: {},
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}
