const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/notes", (req, res)=> {
    console.log("test");
    res.json({message: "testing"})
})

app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));
