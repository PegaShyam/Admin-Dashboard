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

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/dashboard', (req, res) => {
    res.render('index')
})

app.get('/createusers', (req, res) => {
    res.render('createusers')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})


//Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))