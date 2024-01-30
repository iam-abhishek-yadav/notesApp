import { useState } from "react"

const AddNote = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState(null)

	const handleAdd = async () => {
		try {
			const token = localStorage.getItem("Authorization")

			if (!token) {
				console.error("JWT token not found")
				return
			}

			const response = await fetch("http://localhost:3000/api/v1/notes", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			})

			if (response.ok) {
				setStatus({ type: "success", message: "Note added successfully" })
				setTitle("")
				setDescription("")
			} else {
				const data = await response.json()
				setStatus({ type: "error", message: data.error || "Error adding note" })
			}
		} catch (error) {
			console.error("Error adding note:", error.message)
			setStatus({ type: "error", message: "Internal Server Error" })
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 shadow-md rounded-md w-96">
				<h2 className="text-xl font-semibold mb-4">Add Notes</h2>
				{status && (
					<div
						className={`mb-4 ${
							status.type === "success" ? "text-green-500" : "text-red-500"
						}`}>
						{status.message}
					</div>
				)}
				<form>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Title:
							<input
								className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter the title"
							/>
						</label>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Description:
							<textarea
								className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows="4"
								placeholder="Enter the description"></textarea>
						</label>
					</div>
					<button
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
						type="button"
						onClick={handleAdd}>
						Add
					</button>
				</form>
			</div>
		</div>
	)
}

export default AddNote
