
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/todos', todoController.getTodos);

// Create a new todo
router.post('/todos', todoController.createTodo);

// Toggle completed status
router.patch('/todos/:id/toggle', todoController.toggleTodo);

// Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;