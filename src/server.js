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

//------------------------Register a user----------------------------------
app.post('/register', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    // Check if the username exists in the database
    const existingUser = await collection.findOne({ name: data.name })
    if (existingUser) {
        res.send('User name already exists. Please choose a different name.')
    } else {
        try {
            const userData = await collection.insertMany(data)
            console.log(userData)
            res.send('User registered successfully!')
        } catch (error) {
            console.error(error)
            res.send('Error inserting data')
        }
    }
})
//---------------------------------------------------------------------------
//-----------------------------Login user------------------------------------
app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })

        if (!check) {
            return res.status(401).send('User not found')
        }

        if (check.password === req.body.password) {
            res.send('Login successfully')
        } else {
            res.send('Wrong password')
        }
    } catch (error) {
        res.send('Wrong details!')
    }
})
//---------------------------------------------------------------------------

app.listen(4000, () => {
    console.log('server is running')
})
