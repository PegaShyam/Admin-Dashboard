//Imports
const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')
const session = require('express-session')
const mongoSession = require('connect-mongodb-session')(session)
const Store = new mongoSession({
    uri: MONGO_URI,
    collection: 'session'
})
app.use(session({
    secret: process.env.SESSION_SECRET, // always make sure this key is a good and strong string
    resave: false, // this is to prevent the session from being saved in the database everytime we reload the page 
    saveUninitialized: false,
    store: Store,

}))

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

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(user => {
        console.log({level:'info',message:'connnected to the mongodb server sucessfully! and listening on port:3000'})
        app.listen(3000)
    })
    .catch(err => console.log({level:'error',message:err}))