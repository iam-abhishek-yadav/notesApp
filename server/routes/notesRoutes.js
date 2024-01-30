const express = require("express")
const jwtAuth = require("../middlewares/jwtAuth")
const Notes = require("../models/Notes")
const User = require("../models/User")

const router = express.Router()

router.get("/notes", jwtAuth, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.userId })
		res.status(200).json({ notes })
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" })
	}
})

router.post("/notes", jwtAuth, async (req, res) => {
	try {
		const { title, description } = req.body

		const newNote = new Notes({
			title,
			description,
			user: req.user.userId,
			createdDate: new Date(),
		})

		await newNote.save()

		const user = await User.findById(req.user.userId)
		user.notes.push(newNote._id)
		await user.save()

		res.status(201).json({ message: "Note created successfully" })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
