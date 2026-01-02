import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./src/db/mongodb";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "*",
}))


export default app;