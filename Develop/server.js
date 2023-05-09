const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
let db = require('./db/db.json')
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/notes", (req, res)=> {
    console.log("test");
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res)=> {
    res.json(db)
})

app.post("/api/notes", (req, res)=> {
    console.log(req.body)
})

app.get("*", (req, res)=> {
    console.log("test");
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));
