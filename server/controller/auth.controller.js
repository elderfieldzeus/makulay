const conn = require("../database/mysql");
const path = require("path");

exports.signupFunction = (req, res) => {
    const {name, email, password, cpassword} = req.body;
    
    if(!name || !email || !password || !cpassword) {
        console.log("Lacking...");
        return res.status(500).json({success: false, message: "Lacking input." });
    }

    if(password !== cpassword) {
        console.log("Passwords do not match");
        return res.status(500).json({success: false, message: "Passwords do not match." }); 
    }

    // check if not yet in db
    conn.query(`SELECT * FROM accounts WHERE email='${email}';`, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            console.log("Email already exists");
            return res.status(500).json({success: false, message: "Email already exists." });  
        } 

        conn.query(`INSERT INTO accounts (name, email, password) VALUES ('${name}', '${email}', ${password});`, (err) => {
            if(err) throw err;
            return res.status(200).json({success: true, message: "Registered Successfully." }); //FIX THESE
        });
    });
}

exports.signinFunction = (req, res) => {
    const { email, password } = req.body;
}