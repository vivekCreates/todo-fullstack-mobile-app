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


connectToMongoDB(process.env.MONGO_URL!).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to connect to MongoDB. Server not started.",error);
});