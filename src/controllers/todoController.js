const Todo = require("../models/Todo");

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching todos" });
  }
};




const addTodo = async (req, res) => {
  try {
    const { task } = req.body;

    // Basic validation
    if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTodo = await Todo.create({
      userId: req.user.id, // comes from auth middleware
      task: task.trim()
    });

    res.status(201).json(newTodo);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating todo" });
  }
};



const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // 🔒 Ensure user owns the todo
    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({ message: "Todo deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
};





module.exports = {
  getTodo,
  addTodo,
  deleteTodo
};