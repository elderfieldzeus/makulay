const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../")));
app.use(session({
    secret: 'default-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", require("./routes"));
app.use("/user", require("./routes/user.route"));
app.use("/color", require("./routes/color.route"));
app.use("/session", require("./routes/session.route"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));