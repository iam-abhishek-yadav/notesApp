const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const notesRoutes = require("./routes/notesRoutes")
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017")

app.use("/auth", authRoutes)
app.use("/api/v1", notesRoutes)

app.listen(3000, () => console.log("Server is listening to Port 3000"))
