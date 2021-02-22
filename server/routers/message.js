const express = require('express');
const router = express.Router();

const Message = require('../models/Message')

router.get('/', (req, res, next) => {
    Message.find()
        .then((response) => res.json(response))
})
router.get('/search/:name', (req, res, next) => {
    Message.find({name: req.params.name})
        .then((response) => res.json(response))
})
router.post('/new', (req, res, next) => {
    Message.create(req.body)
        .then(() => console.log('created'))
        res.send('created bro')
        next()
})

module.exports = router