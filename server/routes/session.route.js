const express = require("express");
const { getSession } = require("../controller/session.controller");

const router = express.Router();

router.get("/getSession", getSession);

module.exports = router;