require("dotenv").config();

const port = process.env.BACKEND_PORT;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
  })
);

app.set("views", __dirname, "/Components");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});

/* =========================== TOKEN setup =========================== */

const secretKey = process.env.SECRET_KEY;

function generateToken(id) {
  const payload = { id };
  const options = { expiresIn: "5h" };
  return jwt.sign(payload, secretKey, options);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey).id;
  } catch (err) {
    return null;
  }
}

app.get("/api/validateToken", (req, res) => {
  const tokenPayload = verifyToken(req.cookies.token);
  if (!tokenPayload) res.clearCookie("token").json({ tokenID: tokenPayload });
  else res.json({ tokenID: tokenPayload });
});

app.get("/api/validateAdmin", async (req, res) => {
  try {
    const userId = verifyToken(req.cookies.token);
    if (!userId) {
      return res
        .status(401)
        .json({ isAdmin: 0, error: "Invalid token. Unauthorized." });
    }

    const user = await getUserByID(userId);
    if (!user) {
      return res.status(404).json({ isAdmin: 0, error: "User not found." });
    }

    res.json({ isAdmin: user.admin });
  } catch (err) {
    console.error("Error in /api/validateAdmin:", err);
    res.status(500).json({ error: "Server Error." });
  }
});

/* ==================================== SQL setup =================================== */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quizzosaurus",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

const query = require("util").promisify(db.query).bind(db);

/* <=========================== USERS setup ===========================> */

//------- Search User in db ------
async function findUser(username, email = undefined) {
  try {
    const users = await query(
      "SELECT * FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)",
      [username, email]
    );
    for (var user of users) {
      if (user.username === username || user.email === email) {
        return user;
      }
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

async function getUserByID(id) {
  try {
    const user = await query("SELECT * from users WHERE id= ?", [id]);
    return user[0];
  } catch (error) {
    throw error;
  }
}

app.post("/api/checkUser/:id", async (req, res) => {
  try {
    let userFound;

    if (Object.keys(req.body).length !== 0) {
      const { username, email } = req.body;

      if (!username || !email) {
        return res
          .status(400)
          .json({ error: "Username and email are required." });
      }

      userFound = await findUser(username, email);
    } else {
      userFound = await getUserByID(req.params.id);
    }

    const availbl = !userFound || userFound.length === 0;
    res.json({ available: availbl, user: userFound });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Server Error." });
  }
});

//---------- Register query ----------
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }

  try {
    const userFound = await findUser(username, email);
    if (userFound) {
      return res
        .status(401)
        .json({ error: "Username or email already taken." });
    }

    await query(
      "INSERT INTO users (username, email, password, admin, elo) VALUES (?, ?, ?, 0, 0)",
      [username, email, password]
    );
    res.status(200).json({ redirection: "/authenticate" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//---------- Login query ---------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const userFound = await findUser(username);
    if (userFound?.password === undefined) {
      return res.status(401).json({ error: "Invalid username." });
    }
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.cookie("token", generateToken(userFound.id), { httpOnly: true });
    res.status(200).json({ redirection: "/" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error." });
  }
});

//---------- Edit Profile query ---------
app.put("/api/edit_profile", async (req, res) => {
  const loggedUserID = verifyToken(req.cookies.token);
  if (!loggedUserID) {
    return res.status(401).json({ error: "No user is currently logged in." });
  }

  const user = req.body.user;

  if (!user.username && !user.email) {
    return res.status(400).json({ error: "Enter data." });
  }

  try {
    const userFound = await findUser(
      (
        await getUserByID(loggedUserID)
      ).username
    );
    if (user.oldPWD !== undefined && user.newPWD !== undefined) {
      const passwordMatch = await bcrypt.compare(
        user.oldPWD,
        userFound.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password." });
      }
    }

    await query(
      "UPDATE users SET username = ?, email = ?" +
        (user.newPWD === undefined
          ? ""
          : ", password = '" + user.newPWD + "'") +
        " WHERE id= ?",
      [user.username, user.email, loggedUserID]
    );

    res.status(200).json({ redirection: "/profile" });
  } catch (error) {
    console.log("Error during applying changes: ", error);
    res.status(500).json({ error: "Server error." });
  }
});

//---------- Logout query ---------
app.post("/api/logout", (req, res) => {
  if (!verifyToken(req.cookies.token)) {
    return res.status(401).json({ error: "Token doesn't exist." });
  }

  res.status(202).clearCookie("token").json({ redirection: "/" });
});

//------- Delete User query -------
app.delete("/api/delete_user", (req, res) => {
  const token = verifyToken(req.cookies.token);
  if (token) {
    db.query("DELETE FROM users WHERE id=?", [token], (err) => {
      if (err) throw err;
      res.status(202).clearCookie("token").json({ redirection: "/" });
    });
  } else {
    return res.status(401).json({ error: "Token doesn't exist." });
  }
});

/* ================ QUIZ ================== */

async function calculateElo(user, streak, resultQuest) {
  const point = 10;

  let newElo;

  const currentElo = user.elo;
  if (resultQuest === false) {
    if (streak > -5) newElo = currentElo - point / 2;
    else newElo = currentElo - point;
  } else {
    if (streak < 5) newElo = currentElo + point;
    else newElo = currentElo + 2 * point;
  }

  let newStreak;

  newStreak = resultQuest
    ? streak < 0
      ? 1
      : streak + 1
    : streak > 0
    ? -1
    : streak - 1;

  return { newElo, newStreak };
}

function randomizePossibleAnswers(question) {
  const responses = [
    { res: 1, text: question.res1 },
    { res: 2, text: question.res2 },
    { res: 3, text: question.res3 },
    { res: 4, text: question.res4 },
  ];

  for (let i = responses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [responses[i], responses[j]] = [responses[j], responses[i]];
  }

  return {
    id: question.id,
    question: question.question,
    category: question.category,
    responses,
    correct: question.correct,
  };
}

app.patch("/api/verifyAnswer", async (req, res) => {
  const loggedUserID = verifyToken(req.cookies.token);
  const user = await getUserByID(loggedUserID);

  const { userAns, streak } = req.body;

  const elow = await calculateElo(user, streak, userAns);
  await query("UPDATE users SET elo = ? WHERE id= ?", [
    elow.newElo < 0 ? 0 : elow.newElo,
    loggedUserID,
  ]);
  res.status(200).json({
    userAns,
    elo: elow.newElo,
    streak: elow.newStreak,
  });
});

//------- Fetch Question queries -------
app.get("/api/fetchQuestions", (req, res) => {
  const allQuestions = [];
  db.query("SELECT * FROM questions ORDER BY question", (err, result) => {
    if (err) throw err;
    res.status(200).json({ fetchedData: result });
  });
});

app.get("/api/getQuestion", (req, res) => {
  db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) {
      console.error("Error fetching random question:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching a random question." });
    } else {
      const question = randomizePossibleAnswers(result[0]);
      res.status(200).json({ fetchedData: question });
    }
  });
});

app.get("/api/getQuestion/:id", (req, res) => {
  const questionID = req.params.id;
  db.query(
    "SELECT * FROM questions WHERE id= ?",
    [questionID],
    (err, result) => {
      if (err) {
        console.error("Error fetching question:", err);
        res.status(500).json({
          error: "An error occurred while fetching the given question.",
        });
      } else {
        res.status(200).json({ fetchedData: result[0] });
      }
    }
  );
});

//------- Add Question query --------
app.post("/api/addQuestion", (req, res) => {
  const { question, category, res1, res2, res3, res4, correct } =
    req.body.formData;

  db.query(
    "INSERT INTO questions (question, category, res1, res2, res3, res4, correct) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [question, category, res1, res2, res3, res4, correct],
    (err) => {
      if (err) {
        console.error("Error adding question:", err);
        res
          .status(500)
          .json({ error: "An error occurred while adding the question." });
      } else {
        res.status(201).json({ message: "Question added successfully." });
      }
    }
  );
});

//------- Edit Question query --------
app.put("/api/editQuestion/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  console.log(questionId);
  const { question, category, res1, res2, res3, res4, correct } =
    req.body.formData;

  db.query(
    "UPDATE questions SET question = ?, category = ?, res1 = ?, res2 = ?, res3 = ?, res4 = ?, correct = ? WHERE id = ?",
    [question, category, res1, res2, res3, res4, correct, questionId],
    (err) => {
      if (err) {
        console.error("Error editing question:", err);
        res
          .status(500)
          .json({ error: "An error occurred while editing the question." });
      } else {
        res.status(200).json({ message: "Question edited successfully." });
      }
    }
  );
});

//------- Delete Question query -------
app.delete("/api/deleteQuestion/:questionId", (req, res) => {
  const questionId = req.params.questionId;

  db.query("DELETE FROM questions WHERE id = ?", [questionId], (err) => {
    if (err) {
      console.error("Error deleting question:", err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the question." });
    } else {
      res.status(200).json({ message: "Question deleted successfully." });
    }
  });
});

/* =========================== SCOREBOARD =========================== */

app.get("/api/topmostPlayers", (req, res) => {
  try {
    db.query(
      "SELECT username, elo FROM users WHERE elo > 0 ORDER BY elo DESC LIMIT 5",
      (err, topmostPlayers) => {
        if (err) throw err;
        res.status(200).json({ topmostPlayers });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

/* =========================== ROUTES setup =========================== */

app.get("/", (req, res) => {
  res.render("App");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/authenticate", (req, res) => {
  res.render("authenticate");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
app.get("/editprofile", (req, res) => {
  res.render("editprofile");
});
app.get("/quiz", (req, res) => {
  res.render("quiz");
});

/* =========================== THE END =========================== */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
