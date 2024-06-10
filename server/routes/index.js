const express = require("express");
const path = require("path");

const router = express.Router();

router.get(["/", "/login"], (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/login.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/signup.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/home.html"));
})


module.exports = router;