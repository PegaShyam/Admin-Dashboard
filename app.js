//Imports
const express = require('express')
const app = express()
const port = 3000

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

<<<<<<< HEAD
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/dashboard', (req, res) => {
    res.render('dash')
})

app.get('/dash1', (req, res) => {
    res.render('dash1')
})

app.get('/dash2', (req, res) => {
    res.render('dash2')
})

app.get('/dash3', (req, res) => {
    res.render('dash3')
})

// app.get('/dashboard', (req, res) => {
//     res.render('index')
// })

app.get('/createusers', (req, res) => {
    res.render('createusers')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})
=======
const user_routes = require('./router/user')
app.use(user_routes)
>>>>>>> d70cb9287cc54c9e8869fa986e0f52accfc994c6


//Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))