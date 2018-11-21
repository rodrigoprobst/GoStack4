// yarn add express
const express = require('express')

const app = express()

/**
 * CRIA UM MIDDLEWARE
 *
 * Middlewares, interceptam as requisições ao servidor,
 * podendo alterar a requisição ou utilizar dados da mesma para outros fins.
 *
 */
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )
  console.log(req.query)

  // adicionao atributo appName a requisição
  req.appName = 'GoNode'
  return next()
}

/**
 * SETA O MIDDLEWARE
 *
 * Define que todas as requisições que entrarão no servidor, vão utilizar o middleware
 *
 */
app.use(logMiddleware)

/**
 * ROTAS
 *
 * aqui, serão criadas as rotas acesso aos arquivos
 */
app.get('/', (req, res) => {
  if (req.query.name !== undefined) {
    return res.send(`Bem Vindo, ${req.query.name}`)
  } else return res.send(`Bem Vindo ao ${req.appName}`)
})
app.get('/login', (req, res) => {
  return res.send('Login')
})
app.get('/nome/:name', (req, res) => {
  return res.json({ message: `Bem Vindo, ${req.params.name}` })
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
