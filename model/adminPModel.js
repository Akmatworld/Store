const db = require('../db/connection.js');
const {returnObjectDataForTemplate} = require('../model/func.js');

class Authorization {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.login = req.body.login.trim();
    this.password = req.body.password;
  }

  auth() {
    if (!this.login || !this.password) {
      this.res.render('admin/signin', returnObjectDataForTemplate({title: 'Вход в систему', error: 'Логин или пароль пустой', req: this.req}));
    } else {
      let sql = `SELECT login, password FROM adminpanel_users WHERE login='${this.login}' AND password='${this.password}'`;

      db.query(sql, (error, results, fields) => {
          if (error) throw error;
          if (results.length) {
              this.req.session.login = this.login;
              this.res.redirect('/sadmin/');
          } else {
              this.res.render('admin/signin', returnObjectDataForTemplate({title: 'Вход в систему', error: 'Логин или пароль не правильный', req: this.req}));
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
    let sql = `SELECT id, fname, name, permission FROM adminpanel_users`;

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

          this.res.render('admin/users', returnObjectDataForTemplate({title: 'Пользователи',  data: results, req: this.req}));
        } else {
          this.res.render('admin/users', returnObjectDataForTemplate({title: 'Пользователи',  data: [], req: this.req}));
        }
    });
  }
  getUser() {
    let sql = `SELECT * FROM adminpanel_users WHERE id=${this.req.params.id}`;

    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        
        if (results.length) {
          results[0].permission = (results[0].permission === 0) ? 'Админ' : 'Редактор';
          this.res.render('admin/user', returnObjectDataForTemplate({title: 'Пользователи',  data: results[0], req: this.req}));
        } else {
          this.res.render('admin/user', returnObjectDataForTemplate({title: 'Пользователи',  data: {}, req: this.req}));
        }
    });
  }
  addNewUser() {
    let fname = this.req.body.fname.trim();
    let name  = this.req.body.name.trim();
    let email = this.req.body.email.trim();
    let phone = this.req.body.phone.trim();
    let login = this.req.body.login.trim();
    let password = this.req.body.password;
    let permission = this.req.body.permission;

    let data = {fname, name, email, phone, login};

    // Checking user data
    if (!fname || !name || !email || !phone || !login) {
      this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', data, error: 'Заполните все поля!', req: this.req}));
    } else if (typeof password === 'string' || !password[0] || !password[1]) {
      this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', data, error: 'Заполните пароль!', req: this.req}));
    } else if (password[0] !== password[1]) {
      this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', data, error: 'Пароли не совпадают!', req: this.req}));
    }

    try {
      if(!this.req.files) {
        let table = 'adminpanel_users';
        let columns = 'fname, name, email, phone, login, password, permission, photo';
        let values = `'${fname}', '${name}', '${email}', '${phone}', '${login}', '${password[0]}', '${permission}', ''`;
        let sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
        console.log(sql);
        
        db.query(sql, (error, results, fields) => {
          if (error) throw error;
          this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', message: 'Пользователь успешно создан', req: this.req}));
        });
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = this.req.files.photo;
        let pathArr = __dirname.split('/');
        let pathImage = pathArr.splice(0, pathArr.length -1).join('/') + '/adminstatic/uploads/' + avatar.name;

        avatar.mv(pathImage, (err) => {
            if (err) throw err;
        });
        // Query to database
        let table = 'adminpanel_users';
        let columns = 'fname, name, email, phone, login, password, photo, permission';
        let values = `'${fname}', '${name}', '${email}', '${phone}', '${login}', '${password[0]}', '${pathImage}', '${permission}'`;
        let sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`;
        console.log(sql);
        
        db.query(sql, (error, results, fields) => {
          if (error) throw error;
          this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', message: 'Пользователь успешно создан', req: this.req}));
        });
      }
    } catch (err) {
      this.res.render('admin/addnewuser', returnObjectDataForTemplate({title: 'Добавление нового пользователя', error: 'Произошло ошибка при загрузке изображения!' + err, req: this.req}));
    }
  }
}

module.exports = {
  Authorization,
  Users
};