const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content, purchase } = job.data

    Mail.sendMail({
      from: 'becker.rodrigo@outlook.com',
      to: ad.author.email,
      subject: `Solicitação de Compra: ${ad.title}`,
      // html: `<p>Teste: ${content}</p>`
      template: 'purchase',
      context: { user, content, ad, purchase }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
