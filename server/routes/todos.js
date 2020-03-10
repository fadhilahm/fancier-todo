const router = require("express").Router();
const { authentification } = require("../middlewares/authentification");
const { authorization } = require("../middlewares/authorization");
const { TodoController } = require("../controllers");

router.use(authentification);
router.get("/", TodoController.findAll);
router.post("/", TodoController.createNewTodo);
router.get("/:id", authorization, TodoController.view);
router.put("/:id", authorization, TodoController.update);
router.delete("/:id", authorization, TodoController.deleteTodo);

module.exports = router;
