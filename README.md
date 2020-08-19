# Store
Server side rendering with Node.js &amp; Express.js &amp; Pug
## Install
Clone this project and then you need to install necessary dependencies with following command in root folder project:
```sh
npm install
```
## Run
To run this project you need to install mysql and node.js
To install [node.js](https://nodejs.org/) and [mysql](https://www.mysql.com/)

After install you need to configure your mysql create user and set password.
Further you have to find db.config.js file in db folder and enter to your data such as host, user, password, database.
```sh
module.exports = { // Here example data for fill in
    host     : 'localhost', // your host name
    user     : 'root', // user name
    password : 'pass12345', // password
    database : 'cars' // datebase
};
```
Now you can run this project with following command on your terminal:
```sh
npm run start
```
and open your brouser and enter this url: http://localhost:8080