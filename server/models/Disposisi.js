const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DisposisiSchema = new Schema({
    noDisposal: {type: Number},
    noAgenda: {type: Number},
    noSurat: {type: Number},
    kepada: {type: String},
    keterangan: {type: String},
    statusSurat: {type: String},
    tanggapan: {type: String},
})

let Disposisi = mongoose.model('Disposisi', DisposisiSchema)
module.export = Disposisi