const express = require('express');
const adminRoute = express.Router();
const { Authorization, Users } = require('../model/adminPModel.js');

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
    res.render('admin/signin', {title: 'Вход в систему', baseUrl: req.baseUrl});
});

adminRoute.post('/signin', (req, res) => {
    new Authorization(req, res).auth();
});

adminRoute.get('/', checkSession, (req, res) => {
    res.render('admin/adminpanel', {title: 'Главный', login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/productlist', checkSession, (req, res) => {
    res.render('admin/productlist', {title: 'Список продуктов',  login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/addproduct', checkSession, (req, res) => {
    res.render('admin/addproduct', {title: 'Добавить новый продукт',  login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/settings', checkSession, (req, res) => {
    res.render('admin/settings', {title: 'Настройки',  login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/neworder', checkSession, (req, res) => {
    res.render('admin/neworder', {title: 'Новый заказ',  login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/processedorder', checkSession, (req, res) => {
    res.render('admin/processedorder', {title: 'Обработанные заказы',  login: req.session.login, baseUrl: req.baseUrl});
});

adminRoute.get('/users', checkSession, (req, res) => {
    new Users(req, res).getAllUsers();
});

adminRoute.get('/users/:id', checkSession, (req, res) => {
    new Users(req, res).getUser();
});

adminRoute.get('/users/:action/:id', checkSession, (req, res) => {
    console.log(req.params);
    // delete
});

adminRoute.use((req, res, next) => {
    res.status(404).render('admin/404adminpage',
    {
        title: 'Page not found',
        message: '404 Page not found!'
    });
})

module.exports = adminRoute;