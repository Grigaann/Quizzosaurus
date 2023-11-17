const port = 8080;
const secretKey = 'oftidyifuompùilyuktjdrhsdyjfukiloitdrehrqqstr,c;v:m-dtyjch,gjvfuktdyjrshdjyh,g';
const adminUsername = 'admin';
const admindPassword = 'password';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

var server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(cors())
server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.send('Hello World!');
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


/* =========================== ROUTES setup =========================== */


server.get('/', (req, res) => {
    res.render("landing_page");
});


/* =========================== TOKEN setup =========================== */

function generateToken(username) {
    const payload = { username };
    const options = { expiresIn: '5m' };
    return jwt.sign(payload, secretKey, options);
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.username;
    } catch (err) {
        return null; // Token is invalid or expired 
    }
}

/* =========================== SQL setup =========================== */

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quizzosaurus'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});


/* =========================== THE END =========================== */



// catch 404 and forward to error handler
server.use(function (req, res, next) {
    next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = server;
