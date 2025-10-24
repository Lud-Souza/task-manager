const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const TaskRouter = require("./TaskRouter");

router.use("/user", UserRouter);
router.use("/task", TaskRouter);

module.exports = router;
