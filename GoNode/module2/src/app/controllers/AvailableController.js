const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = []
    for (let index = 8; index <= 18; index++) {
      schedule[index - 8] = index + ':00'
    }

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })
    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
