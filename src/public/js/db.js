const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://0.0.0.0:27017/curateDatabase")

connect
  .then(() => {
    console.log("DB Connected successfully")
  })
  .catch(() => {
    console.log("DB cannot be Connected")
  })

const newUserSchema = new mongoose.Schema({
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

const collection = new mongoose.model("user", newUserSchema)

module.exports = collection
