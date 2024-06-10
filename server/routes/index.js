const express = require("express");
const path = require("path");
const { signoutFunction } = require("../controller/auth.controller");

const router = express.Router();

router.get(["/", "/login"], [signoutFunction], (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/login.html"));
});

router.get("/register", [signoutFunction], (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/signup.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/home.html"));
})


module.exports = router;