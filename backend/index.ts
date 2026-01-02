import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import { connectToMongoDB } from "./src/db/mongodb";


connectToMongoDB(process.env.MONGO_URL!).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to connect to MongoDB. Server not started.",error);
});

