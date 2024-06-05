const mongoose = require("mongoose")
const Schema = mongoose.Schema
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

const profileSchema = new mongoose.Schema({
  eventName: {
    type: String,
    require: true,
  },
  music: {
    type: String,
    require: true,
  },
  food: {
    type: String,
    require: true,
  },
  drink: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
})
const profilecollection = new mongoose.model("profile", profileSchema)

module.exports = { collection, profilecollection }
