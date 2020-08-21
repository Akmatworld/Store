const express = require('express');
const adminRoute = express.Router();
const { Authorization, Users } = require('../model/adminPModel.js');
const {checkSessionSignin, checkSession, returnObjectDataForTemplate} = require('../model/func.js');


// Logout & Sign in
adminRoute.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/sadmin/');
    });
});

adminRoute.get('/signin', checkSessionSignin, (req, res) => {
    res.render('admin/signin', returnObjectDataForTemplate({title: 'Вход в систему', req }));
});

adminRoute.post('/signin', (req, res) => {
    new Authorization(req, res).auth();
});

adminRoute.get('/', checkSession, (req, res) => {
    res.render('admin/adminpanel', returnObjectDataForTemplate({title: 'Главный', req }));
});

adminRoute.get('/productlist', checkSession, (req, res) => {
    res.render('admin/productlist', returnObjectDataForTemplate({title: 'Список продуктов', req }));
});

adminRoute.get('/addproduct', checkSession, (req, res) => {
    res.render('admin/addproduct', returnObjectDataForTemplate({title: 'Добавить новый продукт', req }));
});

adminRoute.get('/settings', checkSession, (req, res) => {
    res.render('admin/settings', returnObjectDataForTemplate({title: 'Настройки', req }));
});

adminRoute.get('/neworder', checkSession, (req, res) => {
    res.render('admin/neworder', returnObjectDataForTemplate({title: 'Новый заказ', req }));
});

adminRoute.get('/processedorder', checkSession, (req, res) => {
    res.render('admin/processedorder', returnObjectDataForTemplate({title: 'Обработанные заказы', req }));
});

adminRoute.get('/users', checkSession, (req, res) => {
    new Users(req, res).getAllUsers();
});

adminRoute.get('/users/:id', checkSession, (req, res) => {
    new Users(req, res).getUser();
});

adminRoute.get('/users/:action/:id', checkSession, (req, res) => {
    console.log(req.params);
    if (req.params.action === 'delete') {
        new Users(req, res).deletUser();
    } else {
        new Users(req, res).edit();
    }
});

adminRoute.use((req, res, next) => {
    res.status(404).render('admin/404adminpage',
    {
        title: 'Page not found',
        message: '404 Page not found!'
    });
})

module.exports = adminRoute;