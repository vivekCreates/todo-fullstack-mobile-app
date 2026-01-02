import {Router} from "express"

const router = Router();

router.route("todos").get();
router.route("todos/create").post();
router.route("todos/update/:id").post();
router.route("todos/delete/:id").post();

export default router;