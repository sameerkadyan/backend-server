// routes/todo.js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController.js")
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", authMiddleware, todoController.getTodo);
router.post("/", authMiddleware, todoController.addTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);

module.exports = router;