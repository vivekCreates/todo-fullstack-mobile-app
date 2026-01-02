import dotenv from "dotenv";
dotenv.config({path:".env"});
import { connectToMongoDB } from "./db/mongodb";
import { app } from "./app";


connectToMongoDB(process.env.MONGO_URL!).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to connect to MongoDB. Server not started.",error);
});

