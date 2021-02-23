const express = require('express');
const router = express.Router();

const Disposisi = require('../models/Disposisi')

router.get('/', (req, res, next) => {
    Disposisi.find()
        .populate("noSurat")
        .then((response) => res.json(response))
})
router.get('/:id', (req, res, next) => {
    Disposisi.findById(req.params.id)
        .then((response) => res.json(response))
})
router.get('/search/:search', (req, res, next) => {
    Disposisi.find({noSurat: req.params.search})
        .populate("pengirim")
        .then((response) => res.json(response))
})
router.post('/new', (req, res, next) => {
    console.log(req.body)
    Disposisi.create(req.body)
        .then(() => console.log('created'))
        res.send('created bro')
})
router.put('/update/:id', (req, res, next) => {
    console.log(req.body)
    Disposisi.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('updated'))
})
router.delete('/delete/:id', (req, res, next) => {
    Disposisi.findByIdAndDelete(req.params.id)
        .then(() => console.log('deleted'))
})

module.exports = router