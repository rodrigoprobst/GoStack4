// yarn add express
const express = require('express')
// yarn add nunjuncks
const nunjuncks = require('nunjucks')

// define a constante app sendo o aplicativo (express)
const app = express()

// configura o nunjucks para visualizar a pasta views
nunjuncks.configure('views', {
  // padrão
  autoescape: true,
  // seta a variável express como app
  express: app,
  // monitora alterações nos arquivos para reiniciar a aplicação
  watch: true
})

// seta o express para pegar informações do formulario
app.use(express.urlencoded({ extended: false }))

// define a engine de views para o Nunjucks
app.set('view engine', 'njk')

/**
 * CRIA UM MIDDLEWARE
 *
 * Middlewares, interceptam as requisições ao servidor,
 * podendo alterar a requisição ou utilizar dados da mesma para outros fins.
 *
 */
const checkIdade = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )

  if (req.body.inputIdade === '') {
    return res.redirect('/')
  } else {
    if (req.body.inputIdade >= 18) {
      return res.redirect(`/major?inputIdade=${req.body.inputIdade}`)
    } else {
      return res.redirect(`/minor?inputIdade=${req.body.inputIdade}`)
    }
  }
}
const checkIdadeNotNull = (req, res, next) => {
  if (req.query.inputIdade === '') {
    return res.redirect('/')
  } else {
    return next()
  }
}

/**
 * ROTAS
 *
 * aqui, serão criadas as rotas acesso aos arquivos
 */
// raiz da aplicação
app.get('/', (req, res) => {
  return res.render('home')
})
// página chek, passa o middleware checkIdade que faz os devidos redirecionamentos
app.post('/check', checkIdade)

app.get('/major', checkIdadeNotNull, (req, res) => {
  return res.render('major', { inputIdade: req.query.inputIdade })
})
app.get('/minor', checkIdadeNotNull, (req, res) => {
  return res.render('minor', { inputIdade: req.query.inputIdade })
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
