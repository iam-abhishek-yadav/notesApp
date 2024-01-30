// routes/authRoutes.js
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const User = require("../models/User")

const router = express.Router()

const userSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
})

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

// Signup route
router.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = userSchema.parse(req.body)

		const existingUser = await User.findOne({ $or: [{ email }, { username }] })

		if (existingUser) {
			if (existingUser.email === email) {
				return res.status(400).json({ error: "Email already in use" })
			}

			if (existingUser.username === username) {
				return res.status(400).json({ error: "Username not available" })
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = new User({ username, email, password: hashedPassword })

		await newUser.save()

		res.status(201).json({ message: "User registered successfully" })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const validationErrors = {}
			error.errors.forEach((e) => {
				validationErrors[e.path.join(".")] = e.message
			})
			return res
				.status(400)
				.json({ error: "Invalid input data", validationErrors })
		}
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Login route
router.post("/login", async (req, res) => {
	try {
		const { email, password } = loginSchema.parse(req.body)

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(401).json({ error: "User Not Found" })
		}

		const passwordMatch = await bcrypt.compare(password, user.password)

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials" })
		}

		const token = jwt.sign({ userId: user._id }, "secret123", {
			expiresIn: "1h",
		})

		res.status(200).json({ token })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const validationErrors = {}
			error.errors.forEach((e) => {
				validationErrors[e.path.join(".")] = e.message
			})
			return res
				.status(400)
				.json({ error: "Invalid input data", validationErrors })
		}

		console.error(error.message)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
