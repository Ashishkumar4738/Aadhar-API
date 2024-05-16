
import express from "express";
import cors from "cors";
import path from "path";
import db from "./database/db.js";
import morgan from "morgan";
import router from "./Routes/route.js";
const app = express();

// Enable CORS (Cross origin resource sharing)


app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use("/aadhar",router);

app.use("/uploads",express.static("uploads"));

app.get("/", (req, res) => {
    try {
        res.send("Welcome to the Aadhar card server");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




app.listen(5000, () => {
    console.log("Your Aadhar card server is online now at port 5000");
});