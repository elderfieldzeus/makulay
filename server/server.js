const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", require("./routes"));
app.use("/user", require("./routes/user.route"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));