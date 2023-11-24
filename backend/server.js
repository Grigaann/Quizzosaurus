const port = 8080;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const mysql = require('mysql2');

var server = express();
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(cors());
server.use(bodyParser.json());

server.set('views', __dirname, '/Components')
server.set('view engine', 'jsx');
server.engine('jsx', require('express-react-views').createEngine());

server.get('/', (req, res) => {
    res.send('Hello World!');
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


/* =========================== ROUTES setup =========================== */


server.get('/', (req, res) => {
    res.render("App");
});
server.get('/register', (req, res) => {
    res.render("register");
});
server.get('/login', (req, res) => {
    res.render('login');
});

/* =========================== TOKEN setup =========================== */

const secretKey = 'oftidyifuom<-z654thtgspùilyuktjdrhsdyjfuki34loitdrehrqqstr,c;v:m-dty2jch,gjvfuktd7yjrshdjyh,g';

function generateToken(username) {
    const payload = { username };
    const options = { expiresIn: '1h' };
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


//------- Add query -------
server.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;

    db.query("SELECT * FROM users WHERE username LIKE ?", [username], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            db.query('INSERT INTO users (username, password, email, admin, elo) VALUES (?, ?, ?, 0, 0)', [username, password, email], (err) => {
                if (err) throw err;
                res.redirect('/login');
            });
        } else {
            console.log('This username is already taken');
            res.send("<script>alert('This username is already taken')</script>");
        } 
    });
});

//------- Verify query ------



//------- Login query ------
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username LIKE ?", [username], (err, result) => {
        if (err) throw err;
        try {
            if (bcrypt.compareSync(password, result[0].password)) {
                res.cookie('token', generateToken(username), { httpOnly: true });
                res.redirect("/");
            }
            else res.redirect("/login");
        } catch (err) { res.redirect("/register") }
    });
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
