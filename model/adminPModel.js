const db = require('../db/connection.js');


class adminPModel {
  constructor(body) {
    this.fname = body.fname.trim();
    this.name = body.name.trim();
    this.email = body.email.trim();
    this.phone = body.phone.trim();
    this.login = body.login.trim();
    this.password = body.password[0];
  }
  addToDb (req, res) {
    let table = 'adminpanel';
    let columns = 'fname, name, email, phone, login, password, photo';
    let values = `'${this.fname}', '${this.name}', '${this.email}', '${this.phone}', '${this.login}', '${this.password}', './photo/1.jpg'`;
    let sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
    console.log(sql);
    
    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      req.session.login = this.login;
      res.redirect('/sadmin/');
    });
  }
}

class Authorization {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.login = req.body.login.trim();
    this.password = req.body.password;
  }

  auth() {
    if (!this.login || !this.password) {
      this.res.render('admin/signin', {title: 'Вход в систему', error: 'Логин или пароль пустой'});
    } else {
        let sql = `SELECT login, password FROM adminpanel WHERE login='${this.login}' AND password='${this.password}'`;

        db.query(sql, (error, results, fields) => {
            if (error) throw error;
            if (results.length) {
                this.req.session.login = this.login;
                this.res.redirect('/sadmin/');
            } else {
                this.res.render('admin/signin', {title: 'Вход в систему', error: 'Логин или пароль не правильный, повторите попытку'});
            }
        });
    }
  }
}

// Get list of users
class Users {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  getAllUsers() {
    let users = [];
    let sql = `SELECT id, fname, name, permission FROM adminpanel`;

    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length) {
          
          for (let i = 0; i < results.length; i++) {
            if (results[i].permission === 0) {
              results[i].permission = 'Админ';
            } else {
              results[i].permission = 'Редактор';
            }
          }

          this.res.render('admin/users', {title: 'Пользователи',  data: results, login: this.req.session.login, baseUrl: this.req.baseUrl});
        } else {
          this.res.render('admin/users', {title: 'Пользователи',  data: [], login: this.req.session.login, baseUrl: this.req.baseUrl});
        }
    });
  }
  getUser() {
    let sql = `SELECT * FROM adminpanel WHERE id=${this.req.params.id}`;

    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        
        if (results.length) {
          results[0].permission = (results[0].permission === 0) ? 'Админ' : 'Редактор';
          this.res.render('admin/user', {title: 'Пользователи',  data: results[0], login: this.req.session.login, baseUrl: this.req.baseUrl});
        } else {
          this.res.render('admin/user', {title: 'Пользователи',  data: {}, login: this.req.session.login, baseUrl: this.req.baseUrl});
        }
    });
  }
}

module.exports = {
  adminPModel,
  Authorization,
  Users
};