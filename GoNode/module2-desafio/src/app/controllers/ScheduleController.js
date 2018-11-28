const { Appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  index (req, res) {
    return res.render('schedule/index')
  }

  async list (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      order: [
        // will return `username` DESC
        ['date', 'ASC']
      ]
    })
    return res.render('schedule/list', { appointments })
  }
}

module.exports = new ScheduleController()
