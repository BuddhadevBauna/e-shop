import express from "express";


const app = express();

app.get('/', (req, res) => {
    res.send("Hi");
})


const port = 3030;
app.listen(port, () => {
    console.log("app listining on port 3030...");
})