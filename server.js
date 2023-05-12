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
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
})

app.post("/api/notes", (req, res) => {
    // give an id to our note
    req.body.id = uuidv4();
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(req.body);
        console.log(notes);
        // with the fs module, we need to rewrite our file using the writeFile method
        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            if (err) throw err;
            console.log('Saved!');
            res.json(req.body)
        });

    })
})

app.delete("/api/notes/:id", (req, res) => {
    const Id = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const noteArray = JSON.parse(data);
        const result = noteArray.filter((note) => note.id !== Id);
        console.log(JSON.stringify(result));
        fs.writeFile('./db/db.json', JSON.stringify(result), (err) => {
            if (err) throw err;
            res.json(`Item ${Id} has been deleted 🗑️`);
        });
    })
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
