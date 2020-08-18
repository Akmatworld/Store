const express = require('express');
const adminRoute = express.Router();
const FregisterModel = require('../model/adminPModel.js');
const { Authorization } = require('../model/adminPModel.js');

function checkSession(req, res, next) {
    if (!req.session.login) {
        res.redirect('/sadmin/signin');
    } else {
        next();
    }
}
function checkSessionSignin (req, res, next) {
    if (!!req.session.login) {
        res.redirect(req.baseUrl + '/');
    } else {
        next();
    }
}
// Logout & Sign in
adminRoute.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/sadmin/');
    });
});
adminRoute.get('/signin', checkSessionSignin, (req, res) => {
    res.render('admin/signin', {title: 'Вход в систему'});
});
adminRoute.post('/signin', (req, res) => {
    new Authorization(req, res).auth();
});

// Logic
adminRoute.get('/', checkSession, (req, res) => {
    res.render('admin/adminpanel', {title: 'Главный', login: req.session.login, baseUrl: req.baseUrl});
});
adminRoute.get('/productlist', checkSession, (req, res) => {
    res.render('admin/productlist', {title: 'Продукты',  login: req.session.login, baseUrl: req.baseUrl});
});
adminRoute.get('/addproduct', checkSession, (req, res) => {
    res.render('admin/addproduct', {title: 'Добавить новый продукт',  login: req.session.login, baseUrl: req.baseUrl});
});
adminRoute.get('/settings', checkSession, (req, res) => {
    res.render('admin/settings', {title: 'Настройки',  login: req.session.login, baseUrl: req.baseUrl});
});

module.exports = adminRoute;