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
Further you have to create file named db.config.js in the db folder and fill in this file with your data such as host, user, password, database.
As you can see there is example below
```sh
module.exports = { // Here example data for fill in
    host     : 'localhost', // your host name
    user     : 'root', // user name
    password : 'pass12345', // password
    database : 'cars' // datebase
};
```
After the database configure you need to create a file called sess.config.js in the root folder and than you need to set a session option such as secret key.
Here is an example:
```sh
sess.config.js

module.exports = {
    secret: 'secretkey' // Here will be your secret key
};
```
Now you can run this project with following command on your terminal:
```sh
npm run start
```
and open this url: http://localhost:8080 in your brouser