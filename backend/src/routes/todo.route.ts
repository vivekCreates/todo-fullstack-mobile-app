import {Router} from "express"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/auth.niddleware";

const router = Router();

router.use(authMiddleware);

router.route("/").get(getTodos);
router.route("/create").post(createTodo);
router.route("/update/:id").post(updateTodo);
router.route("/delete/:id").post(deleteTodo);

export default router;