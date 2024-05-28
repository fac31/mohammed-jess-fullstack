const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const collection = require('../src/public/js/db')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/about.html'))
})

//----------Register a user----------------------------------
app.post('/register', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const userData = await collection.insertMany(data)
        console.log(userData)
        res.status(201).send('User registered successfully!')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error inserting data')
    }
})
//----------------------------------------------------------

app.listen(4000, () => {
    console.log('server is running')
})
