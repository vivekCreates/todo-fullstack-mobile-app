import express from "express";
import cors from "cors";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "*",
}))

import userRoutes from "./src/routes/user.route";
import todoRoutes from "./src/routes/todo.route";

app.use("/api/users/", userRoutes);
app.use("/api/todos/", todoRoutes);

export default app;