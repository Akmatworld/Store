const express = require('express');
const db = require('./db/connection.js');

const port = process.env.PORT || 3000;
const app = express();
app.use('/public', express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');

// Routs
app.get('/', (req, res) => {
    db.query('SELECT * FROM test', (error, results, fields) => {
        if (error) throw error;
        console.log(results[0])
        res.render('index', {title: 'Home', message: results[0].name});
    });
});

app.listen(port, () => console.log(`Server has been started on port ${port}`));