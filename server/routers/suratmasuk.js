const express = require('express');
const router = express.Router();

const SuratMasuk = require('../models/SuratMasuk')

router.get('/', (req, res, next) => {
    SuratMasuk.find()
        .populate("pengirim")
        .then((response) => res.json(response))
})
router.get('/:id', (req, res, next) => {
    SuratMasuk.findById(req.params.id)
        .then((response) => res.json(response))
})
router.get('/search/:name', (req, res, next) => {
    SuratMasuk.find({perihal: req.params.perihal})
        .then((response) => res.json(response))
})
router.post('/new', (req, res, next) => {
    SuratMasuk.create(req.body)
        .then(() => console.log('created'))
        res.send('created bro')
        next()
})
router.put('/update/:id', (req, res, next) => {
    SuratMasuk.findByIdAndUpdate(req.params.id, req.body)
        .then(() => console.log('created'))
        res.send('created bro')
        next()
})
router.delete('/delete/:id', (req, res, next) => {
    SuratMasuk.findByIdAndDelete(req.params.id)
        .then(() => console.log('deleted'))
})

module.exports = router