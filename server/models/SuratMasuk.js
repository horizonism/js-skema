const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SuratMasukSchema = new Schema({
    noAgenda: {type: Number},
    jenisSurat: {type: String},
    tanggalKirim: {type: Date},
    tanggalTerima: {type: Date},
    noSurat: {type: Number},
    pengirim: {type: Schema.Types.ObjectId, ref: "Petugas"},
    perihal: {type: String}
})

let SuratMasuk = mongoose.model('SuratMasuk', SuratMasukSchema)
module.exports = SuratMasuk