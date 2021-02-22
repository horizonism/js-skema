const express = require('express');
const router = express.Router();
const passport = require('passport');

const Petugas = require('../models/Petugas')

router.post('/login', passport.authenticate('local'))

router.post('/register', (req, res, next) => {
    Petugas.findOne({username: req.body.username}, (err, doc) => {
        if(err) throw err
        if(doc) {
            res.json('Username is taken')
        } else {
            Petugas.create(req.body)
                .then(() => console.log('Created'))
                res.send('Register')
        }
    })
})

router.get('/', (req, res, next) => {
    console.log(req.user)
    res.send(req.user)
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.send('Logout')
})

module.exports = router