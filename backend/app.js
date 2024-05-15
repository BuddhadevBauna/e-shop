import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


//Initialize express server
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Use routes


app.get("/", (req, res) => {
    res.send("Hello");
})


const port = 3030;
app.listen(port, () => {
    console.log("app listining on port 3030...");
})