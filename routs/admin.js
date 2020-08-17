const db = require('../db/connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = express.Router();

// adminRoute.use(bodyParser.json());
// adminRoute.use(bodyParser.urlencoded({extended: false}));

function checkSession(req, res, next) {
    if (!req.session.login) {
        res.redirect('/sadmin/firstreg');
    } else {
        next();
    }
}

adminRoute.get('/', checkSession, (req, res) => {
    res.render('admin/adminpanel', {title: 'Main admin panel', message: req.session.login});
});
adminRoute.get('/firstreg', (req, res) => {
    res.render('admin/firstreg', {title: 'Регистрация'});
});
adminRoute.post('/firstreg', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

module.exports = adminRoute;