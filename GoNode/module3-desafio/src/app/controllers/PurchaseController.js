const User = require('../models/User')
const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async accept (req, res) {
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { ...req.body, accepted: true },
      {
        // after update return Ad updated
        new: true
      }
    )

    const { ad: purshachedAd } = purchase

    await Ad.findByIdAndUpdate(purshachedAd, { purchasedBy: req.params.id })

    return res.json(purchase)
  }

  async show (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    return res.json(purchase)
  }

  async request (req, res) {
    const { ad, content } = req.body

    const purchase = await Purchase.create({ ...req.body, author: req.userId })

    const purchasedAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchasedAd,
      user,
      purchase,
      content
    }).save()

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
