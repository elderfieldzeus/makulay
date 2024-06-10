const conn = require("../database/mysql");

exports.addColor = (req, res) => {
    const { color } = req.body;
    const { account_id } = req.session;

    if(!color) {
        console.log("Lacking Color...")
        return res.status(500).send({success: false});
    }

    if(!account_id) {
        console.log("Lacking Account...")
        return res.status(500).send({success: false});
    }
    
    conn.query("INSERT INTO colors (color_code, account_id) VALUES (?, ?)", [color, account_id], (err) => {
        if(err) {
            throw err;
        }
        console.log(`Added ${color} and ${account_id} to db successfully`);
        return res.status(200).send({success: true});
    })
}

exports.getColors = (req, res) => {
    const { account_id } = req.session;

    if(!account_id) {
        return res.send({success: false});
    }

    conn.query("SELECT * FROM colors WHERE account_id=?;", [account_id], (err, result) => {
        if(err) throw err;

        const isEmpty = (result.length == 0) ? true : false;
        const colors = []

        result.forEach((r) => {
            colors.push({color_id: r.color_id, color_code: r.color_code});
        })        

        res.send({success: true, colors, isEmpty});
    });
}