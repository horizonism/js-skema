const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AuthSchema = new Schema({
    namaDepan: {type: String},
    namaBelakang: {type: String},
    username: {type: String},
    password: {type: String},
    hak: {type: String, enum: ['admin', 'user'], default: 'user'}
})

let Auth = mongoose.model('Auth', AuthSchema)
module.exports = Auth