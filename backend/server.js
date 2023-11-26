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
const bcrypt = require('bcrypt');

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
        return null;
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

const util = require('util');
const query = util.promisify(db.query).bind(db);

//------- Search User in db ------
async function findUser(username, email) {
    try {
        const users = await query("SELECT username, email FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)", [username, email]);
        return (users.length > 0);
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

server.post('/api/checkUser', async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required.' });
    }
    const availbl = !(await findUser(username, email));
    res.json({ available: availbl });
});

//---------- Register query ----------
server.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    try {
        const userExists = await findUser(username, email);
        if (userExists) {
            return res.status(401).json({ error: 'Username or email already taken.' });
        }

        await query('INSERT INTO users (username, email, password, admin, elo) VALUES (?, ?, ?, 0, 0)', [username, email, password]);
        res.status(200).json({ success: true, redirection: '/login' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//---------- Login query ---------
server.post('/api/login', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const userExists = await findUser(username, email);
        if (!userExists) {
            return res.status(401).json({ error: 'Invalid username.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const token = generateToken(username);
        res.json({ token, redirection: '/error' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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


module.exports = server;
