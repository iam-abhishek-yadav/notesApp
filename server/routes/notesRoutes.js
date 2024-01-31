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

router.delete("/notes/:id", jwtAuth, async (req, res) => {
	try {
		const noteId = req.params.id
		const noteToDelete = await Notes.findById(noteId)
		if (!noteToDelete) {
			return res.status(404).json({ error: "Note not found" })
		}

		const userId = noteToDelete.user
		await User.findByIdAndUpdate(userId, {
			$pull: { notes: noteId },
		})
		const deletedNote = await Notes.findByIdAndDelete(noteId)

		res.json({ message: "Note deleted successfully", deletedNote })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

router.put("/notes/:id", jwtAuth, async (req, res) => {
	try {
		const noteId = req.params.id
		const { title, description, status } = req.body

		const noteToUpdate = await Notes.findById(noteId)
		if (!noteToUpdate) {
			return res.status(404).json({ error: "Note not found" })
		}

		noteToUpdate.title = title
		noteToUpdate.description = description
		noteToUpdate.status = status

		const updatedNote = await noteToUpdate.save()

		res.json(updatedNote)
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
