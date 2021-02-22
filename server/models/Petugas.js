const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PetugasSchema = new Schema({
    namaDepan: {type: String},
    namaBelakang: {type: String},
    username: {type: String},
    password: {type: String},
    hak: {type: String, enum: ['admin', 'user'], default: 'user'}
})

const Petugas = mongoose.model('Petugas', PetugasSchema)
module.exports = Petugas