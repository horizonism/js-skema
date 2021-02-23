const express = require('express');
const router = express.Router();

const SuratKeluar = require('../models/SuratKeluar')

router.get('/', (req, res, next) => {
    SuratKeluar.find()
        .populate("pengirim")
        .then((response) => res.json(response))
})
router.get('/:id', (req, res, next) => {
    SuratKeluar.findById(req.params.id)
        .then((response) => res.json(response))
})
router.get('/search/:search', (req, res, next) => {
    SuratKeluar.find({noSurat: req.params.search})
        .populate("pengirim")
        .then((response) => res.json(response))
})
router.post('/new', (req, res, next) => {
    SuratKeluar.create(req.body)
        .then(() => console.log('created'))
        res.send('created bro')
        next()
})
router.put('/update/:id', (req, res, next) => {
    SuratKeluar.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('updated'))
})
router.delete('/delete/:id', (req, res, next) => {
    SuratKeluar.findByIdAndDelete(req.params.id)
        .then(() => console.log('deleted'))
})

module.exports = router