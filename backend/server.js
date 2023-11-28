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
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

server.set('views', __dirname, '/Components')
server.set('view engine', 'jsx');
server.engine('jsx', require('express-react-views').createEngine());

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

server.get('/api/validateToken', (req, res) => {
    res.json({ isValidated: verifyToken(req.cookies.token)});
});

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
async function findUser(username, email = undefined) {
    try {
        const users = await query("SELECT * FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)", [username, email]);
        for (var user of users) {
            if (user.username === username || user.email === email)
                return user;
        }
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
    const userFound = await findUser(username, email);
    const availbl = (!userFound || userFound.length === 0);
    res.json({ available: availbl, user: userFound });
});

//---------- Register query ----------
server.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    try {
        const userFound = await findUser(username, email);
        if (userFound) {
            return res.status(401).json({ error: 'Username or email already taken.' });
        }

        await query('INSERT INTO users (username, email, password, admin, elo) VALUES (?, ?, ?, 0, 0)', [username, email, password]);
        res.status(200).json({ success: true, redirection: '/authenticate' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


//---------- Login query ---------
server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const userFound = await findUser(username);
        if ((userFound?.password) === undefined) {
            return res.status(401).json({ error: 'Invalid username.' });
        }
        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        res.cookie('token', generateToken(username), { httpOnly: true });
        res.status(200).json({ redirection: '/profile' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error.' });
    }
});


//---------- Logout query ---------
server.post('/api/logout', (req, res) => {
    if (!verifyToken(req.cookies.token)) {
        return res.status(401).json({ error: "Token doesn't exist." });
    }

    res.status(202).clearCookie('token').json({ redirection: '/authenticate' });
});


//------- DeleteUser query -------
server.delete('/api/delete_user', (req, res) => {
    const token = verifyToken(req.cookies.token);
    if (token) {
        db.query('DELETE FROM users WHERE username=?', [token], (err) => {
            if (err) throw err;
            res.status(202).clearCookie('token').json({ name:token, redirection: '/profile' });
        });
    }
    else{
        return res.status(401).json({ error: "Token doesn't exist." });
    }
});

/* =========================== ROUTES setup =========================== */


server.get('/', (req, res) => {
    res.render("App");
});
server.get('/register', (req, res) => {
    res.render("register");
});
server.get('/authenticate', (req, res) => {
    res.render('authenticate');
});
server.get('/profile', (req, res) => {
    res.render('profile');
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
