const express = require("express");
const { addColor, getColors } = require("../controller/color.controller");

const router = express.Router();
const bodyParser = require("body-parser")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/addColor", addColor);
router.get("/getColors", getColors);

module.exports = router;