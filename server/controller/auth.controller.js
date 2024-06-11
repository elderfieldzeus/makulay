const conn = require("../database/mysql");
const bcrypt = require("bcryptjs");

exports.signupFunction = async (req, res) => {
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
    conn.query(`SELECT * FROM accounts WHERE email='${email}';`, async (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            console.log("Email already exists");
            return res.status(500).json({success: false, message: "Email already exists." });  
        } 

        const hash = await bcrypt.hash(password, 10);
        conn.query(`INSERT INTO accounts (name, email, password) VALUES (?, ?, ?);`, [name, email, hash], (err) => {
            if(err) throw err;
            return res.status(200).json({success: true, message: "Registered Successfully." }); //FIX THESE
        });
    });
}

exports.signinFunction = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        console.log("Lacking...");
        return res.status(500).json({success: false});
    }

    conn.query("SELECT * FROM accounts WHERE email=?;", [email], (err, result) => {
        if(err) throw err;

        console.log("meow");

        if(result.length == 0 || !bcrypt.compareSync(password, result[0].password)) {
            return res.status(500).send({success: false});
        }
        else {
            const { account_id, name } = result[0];
            req.session.account_id = account_id;
            return res.status(200).send({success: true, account_id, name});
        }
    });
}

exports.signoutFunction = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.send({success: false});
        }
        res.send({success: true});
    })
}