const express = require('express');
const router = express.Router();
const passport = require('passport');

const Auth = require('../models/Auth')

router.post('/login', passport.authenticate('local'))

router.post('/register', (req, res, next) => {
    Auth.findOne({username: req.body.username}, (err, doc) => {
        if(err) throw err
        if(doc) {
            res.json('Username is taken')
        } else {
            Auth.create(req.body)
                .then(() => console.log('Created'))
                res.send('Register')
        }
    })
})

router.get('/', (req, res, next) => {
    res.send(req.user)
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/Howry')
})

module.exports = router