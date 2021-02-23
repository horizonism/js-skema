const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SuratKeluarSchema = new Schema({
    noAgenda: {type: Number},
    jenisSurat: {type: String},
    tanggalKirim: {type: Date},
    noSurat: {type: Number},
    pengirim: {type: Schema.Types.ObjectId, ref: "Petugas"},
    perihal: {type: String}
})

const SuratKeluar = mongoose.model('SuratKeluar', SuratKeluarSchema)
module.exports = SuratKeluar

