import {Router} from "express"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.route("/all").get(getTodos);
router.route("/create").post(createTodo);
router.route("/update/:id").patch(updateTodo);
router.route("/delete/:id").delete(deleteTodo);

export default router;