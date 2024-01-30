const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	endDate: {
		type: Date,
	},
	status: {
		type: String,
		enum: ["Todo", "In Progress", "Done"],
		default: "Todo",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
