const conn = require("../database/mysql");

exports.getSession = (req, res) => {
    const { account_id } = req.session;
    if(!account_id) {
        return res.send({ success: false });
    }

    conn.query("SELECT * FROM accounts WHERE account_id=?;", [account_id], (err, result) => {
        if(err) throw err;
        
        const { name } = result[0];

        if(!name) return res.send({ success: false });

        res.send({success: true, account_id, name});
    });
}

exports.destroySession = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) throw err;
    });
    next();
}