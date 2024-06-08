const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..")));

app.use("/", require("./routes"));
app.use("/user", require("./routes/user"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));