const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
let db = require('./db/db.json')
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    // give an id to our note
    req.body.id = uuidv4();
    // add new note to our db variable
    db.push(req.body);
    console.log(db);
    // with the fs module, we need to rewrite our file using the writeFile method
    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    // send the new note back to the frontEnd
    res.json(req.body)
})

app.delete("/api/notes/:id", (req, res) => {
    res.json(db)
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
