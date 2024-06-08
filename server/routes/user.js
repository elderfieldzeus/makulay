const express = require("express");
const { signinFunction, signupFunction } = require("../controller/auth.controller");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/signin", signinFunction);

router.post("/signup", signupFunction);

module.exports = router;