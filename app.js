const express = require('express');
const session = require('express-session');
const db = require('./db/connection.js');
const dbConfig = require('./db/db.config.js');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
// Import routes
const admin = require('./routs/admin.js');


app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './views');
app.set('view engine', 'pug');

const MySQLStore = require('express-mysql-session')(session);
// Options for session store
const options = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};
 
const sessionStore = new MySQLStore(options);
app.use(session(
    { 
        secret: 'secretkeyforme',
        name: 'mySessionID',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }
));

// Routes
// Front end
app.get('/', (req, res) => {
    res.send('ok');
});


// Backend
app.use('/sadmin', admin);


app.listen(port, () => console.log(`Server has been started on port ${port}`));