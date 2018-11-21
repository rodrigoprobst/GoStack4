// yarn add express
const express = require('express')
// yarn add nunjuncks
const nunjuncks = require('nunjucks')

const app = express()

// configura o nunjucks
nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// seta o express para pegar informações do formulario
app.use(express.urlencoded({ extended: false }))
// define a engine de views para o Nunjucks
app.set('view engine', 'njk')

const users = ['Rodrigo Becker Probst', 'Joice Ramos', 'Diego Koga']

/**
 * ROTAS
 *
 * aqui, serão criadas as rotas acesso aos arquivos
 */
app.get('/', (req, res) => {
  return res.render('list', { users })
})
app.get('/new', (req, res) => {
  return res.render('new')
})
app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

/**
 * DEFINE A PORTA DO SERVIDOR
 *
 * Aqui, o servidor começará a escutar a porta 3000
 * sendo assim, podemos acessar no navegador a url http://localhost:3000
 * que o browser fará uma requisição ao nosso servidor
 *
 */
app.listen(3000)
