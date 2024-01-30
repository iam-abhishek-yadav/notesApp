const express = require("express")
const jwtAuth = require("../middlewares/jwtAuth")
const Todo = require("../models/Todo")

const router = express.Router()

// Get Todos route
router.get("/todos", jwtAuth, async (req, res) => {
	try {
		const todos = await Todo.find({ user: req.user.userId })
		console.log(todos)
		res.status(200).json(todos)
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Post Todo route
router.post("/todos", jwtAuth, async (req, res) => {
	console.log(req.headers)
	try {
		const { title, description } = req.body
		const newTodo = new Todo({
			title,
			description,
			user: req.user.userId,
		})

		await newTodo.save()

		res.status(201).json({ message: "Todo created successfully" })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Put Todo route
router.put("/todos/:id", jwtAuth, async (req, res) => {
	try {
		const { title, description } = req.body
		await Todo.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
			},
			{ new: true }
		)

		res.status(200).json({ message: "Todo updated successfully" })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Delete Todo route
router.delete("/todos/:id", jwtAuth, async (req, res) => {
	try {
		await Todo.findByIdAndDelete(req.params.id)

		res.status(200).json({ message: "Todo deleted successfully" })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
