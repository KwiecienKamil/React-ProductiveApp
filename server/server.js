const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "schedule"
})

app.get('/', (req,res) => {
    return res.json("From server")
})

app.get("/users", (req,res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.listen(8081, () => {
    console.log('listening')
})