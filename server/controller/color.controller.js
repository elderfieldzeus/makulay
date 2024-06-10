const conn = require("../database/mysql");

exports.addColor = (req, res) => {
    const { color } = req.body;

    if(!color) {
        console.log("Lacking Color...")
        return res.status(500).send({success: false});
    }
    
    conn.query("INSERT INTO colors (color_code) VALUES (?)", [color], (err) => {
        if(err) {
            throw err;
        }
        console.log(`Added ${color} to db successfully`);
        return res.status(200).send({success: true});
    })

}