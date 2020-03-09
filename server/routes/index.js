const router = require("express").Router();
const userRouter = require("./users");
const todoRouter = require("./todos");

router.use(userRouter);
router.use("/todos", todoRouter);

module.exports = router;
