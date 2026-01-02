import {Router} from "express"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/auth.niddleware";

const router = Router();

router.use(authMiddleware);

router.route("todos").get(getTodos);
router.route("todos/create").post(createTodo);
router.route("todos/update/:id").post(updateTodo);
router.route("todos/delete/:id").post(deleteTodo);

export default router;