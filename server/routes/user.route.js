const express = require("express");
const { signinFunction, signupFunction } = require("../controller/auth.controller");

const router = express.Router();
const bodyParser = require("body-parser")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signin", signinFunction);

router.post("/signup", signupFunction);

module.exports = router;