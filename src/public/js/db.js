const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://0.0.0.0:27017/login')

connect
    .then(() => {
        console.log('DB Connected successfully')
    })
    .catch(() => {
        console.log('DB cannot be Connected')
    })

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
})

const collection = new mongoose.model('user', loginSchema)

module.exports = collection
