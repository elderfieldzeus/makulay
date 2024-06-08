const express = require("express");
const bcrypt = require("bcryptjs");
const conn = require("../database/mysql");

const router = express.Router();

router.get("/signin", (req, res) => {
    const {email, password} = res.body;


});

router.get("/signup", (req, res) => {
    const {name, email, password, cpassword} = res.body;
    if(!name || !email || !password || !cpassword) return console.log("Lacking...");

    if(password !== cpassword) return console.log("Passwords do not match");

    // conn.connect((err) => {
    //     if(err) throw err;
    //     //check if not yet in db
        conn.query(`SELECT * FROM accounts WHERE email='${email}';`, (err, res) => {
            if(res.length > 0) return console.log("Email already exists");

            conn.query(`INSERT INTO accounts (name, email, password) VALUES ('${name}', '${email}', ${password});`, (err) => {
                if(err) throw err;
                alert("Successfuly Added to db");
            });
        });
    // });
});

module.exports = router;