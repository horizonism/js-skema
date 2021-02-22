const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MessageSchema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
})

let Message = mongoose.model('Message', MessageSchema)
module.exports = Message