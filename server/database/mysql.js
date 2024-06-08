const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306
});

conn.connect((err) => {
    if(err) {
        throw err;
    }

    conn.query("CREATE DATABASE IF NOT EXISTS makulay_db;", (err) => {
        if(err) throw(err);
        console.log("Database is made");

        conn.changeUser({database: "makulay_db"}, (err) => {
            if(err) throw err;
            conn.query("CREATE TABLE IF NOT EXISTS accounts (account_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);", (err) => {
                if(err) throw err;
                console.log("'accounts' Table Created");

                conn.query("CREATE TABLE IF NOT EXISTS colors (color_id INT AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, account_id INT, FOREIGN KEY (account_id) REFERENCES accounts(account_id));", (err) => {
                    if(err) throw err;
                    console.log("'colors' Table Created");

                    // conn.end((err) => {
                    //     if(err) throw err;
                    //     console.log("Inital connection successful");
                    // });
                });
            });
        });
    });
});

module.exports = conn;