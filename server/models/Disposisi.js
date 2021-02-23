const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DisposisiSchema = new Schema({
    noDisposisi: {type: Number},
    noAgenda: {type: Number},
    noSurat: {type: Schema.Types.ObjectId, ref: "SuratMasuk"},
    kepada: {type: String},
    keterangan: {type: String},
    statusSurat: {type: String, default: "Normal"},
    tanggapan: {type: String},
})

const Disposisi = mongoose.model('Disposisi', DisposisiSchema)
module.exports = Disposisi