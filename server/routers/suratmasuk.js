const express = require('express');
const router = express.Router();

const SuratMasuk = require('../models/SuratMasuk')

router.get('/', (req, res, next) => {
    SuratMasuk.find()
        .populate("pengirim")
        .then((response) => res.json(response))
})
router.get('/search/:name', (req, res, next) => {
    SuratMasuk.find({perihal: req.params.perihal})
        .then((response) => res.json(response))
})
router.post('/new', (req, res, next) => {
    SuratMasuk.create(req.body)
    // SuratMasuk.create(req.body)
    //     .then(() => console.log('created'))
    //     res.send('created bro')
    //     next()
})

module.exports = router