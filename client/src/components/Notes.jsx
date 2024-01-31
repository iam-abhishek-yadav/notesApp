import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"

const Notes = () => {
	const [notes, setNotes] = useState([])
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState(null)
	const [editTitle, setEditTitle] = useState("")
	const [editDescription, setEditDescription] = useState("")
	const [editStatus, setEditStatus] = useState("")
	const [selectedNote, setSelectedNote] = useState(null)
	const navigate = useNavigate()
	const fetchNotes = async () => {
		try {
			const token = localStorage.getItem("Authorization")
			if (!token) {
				navigate("/login")
			}
			const resp = await fetch("http://localhost:3000/api/v1/notes", {
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
			if (resp.ok) {
				const data = await resp.json()
				setNotes(data.notes)
			} else {
				if (resp.status === 403) {
					navigate("/login")
				}
			}
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		fetchNotes()
	}, [])

	const clearStatus = () => {
		setTimeout(() => {
			setStatus({ type: "", message: "" })
		}, 5000)
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleAdd()
		}
	}

	const handleAdd = async () => {
		try {
			const token = localStorage.getItem("Authorization")
			if (!token) {
				navigate("/login")
			}
			if (title === "" || description === "") {
				setStatus({ type: "error", message: "Both fields are required" })
				clearStatus()
				return
			}
			const resp = await fetch("http://localhost:3000/api/v1/notes", {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			})
			if (resp.ok) {
				setStatus({ type: "success", message: "Note added successfully" })
				clearStatus()
				setTitle("")
				setDescription("")
				fetchNotes()
			} else {
				if (resp.status === 403) {
					navigate("/login")
				}
				const data = await resp.json()
				setStatus({ type: "error", message: data.error || "Error adding note" })
				clearStatus()
			}
		} catch (error) {
			setStatus({ type: "error", message: "Internal Server Error" })
			clearStatus()
		}
	}

	const handleDeleteNote = async (id) => {
		try {
			const token = localStorage.getItem("Authorization")
			if (!token) {
				navigate("/login")
				return
			}

			const resp = await fetch(`http://localhost:3000/api/v1/notes/${id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})

			if (resp.ok) {
				fetchNotes()
			} else {
				if (resp.status === 403) {
					navigate("/login")
				}
				const data = await resp.json()
				setStatus({
					type: "error",
					message: data.error || "Error deleting note",
				})
				clearStatus()
			}
		} catch (error) {
			setStatus({
				type: "error",
				message: "Internal Server Error",
			})
			clearStatus()
		}
	}

	const handleEditNote = (note) => {
		setEditTitle(note.title)
		setEditDescription(note.description)
		setEditStatus(note.status)
		setSelectedNote(note)
	}

	const handleSaveEdit = async () => {
		try {
			const token = localStorage.getItem("Authorization")
			if (!token) {
				navigate("/login")
				return
			}

			const resp = await fetch(
				`http://localhost:3000/api/v1/notes/${selectedNote._id}`,
				{
					method: "PUT",
					headers: {
						authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: editTitle,
						description: editDescription,
						status: editStatus,
					}),
				}
			)

			if (resp.ok) {
				fetchNotes()
				setSelectedNote(null)
				setEditTitle("")
				setEditDescription("")
				setEditStatus("")
			} else {
				if (resp.status === 403) {
					navigate("/login")
				}
				const data = await resp.json()
				setStatus({
					type: "error",
					message: data.error || "Error editing note",
				})
				clearStatus()
			}
		} catch (error) {
			setStatus({
				type: "error",
				message: "Internal Server Error",
			})
			clearStatus()
		}
	}

	const handleCancelEdit = () => {
		setSelectedNote(null)
	}

	return (
		<div>
			<div>
				<div className="min-h-screen flex items-center justify-center bg-gray-100">
					<div className="bg-white p-8 shadow-md rounded-md w-96">
						<h2 className="text-2xl font-semibold mb-4">Add a new note</h2>
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
										className="border border-gray-300 p-2 w-full mt-1"
										type="text"
										value={title}
										onKeyDown={(e) => handleKeyDown(e)}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</label>
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Description:
									<textarea
										className="border border-gray-300 p-2 w-full mt-1"
										type="text"
										value={description}
										onKeyDown={(e) => handleKeyDown(e)}
										onChange={(e) => setDescription(e.target.value)}
									/>
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
			</div>
			<div>
				{notes.map((note) => (
					<div
						key={note._id}
						className="relative border border-gray-200 p-4 mb-4 rounded-md shadow-md">
						<div className="flex justify-between items-start mb-2">
							<div>
								<div className="font-bold text-lg">{note.title}</div>
								<div className="text-gray-700 mb-2">{note.description}</div>
							</div>
							<div className="flex justify-between items-start">
								<div className="flex items-center">
									<div className="text-blue-500 mr-5">
										Status: {note.status}
									</div>
									<button
										className="text-blue-500 mr-5 hover:text-blue-700"
										onClick={() => handleEditNote(note)}>
										<FontAwesomeIcon icon={faEdit} />
									</button>
									<button
										className="text-red-500 hover:text-red-700"
										onClick={() => handleDeleteNote(note._id)}>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</div>
								<div className="text-sm text-gray-500 absolute bottom-2 right-2">
									Created: {new Date(note.createdDate).toLocaleDateString()}
								</div>
							</div>
						</div>
						{selectedNote && selectedNote._id === note._id && (
							<div>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										New Title:
										<input
											className="border border-gray-300 p-2 w-full mt-1"
											type="text"
											value={editTitle}
											onChange={(e) => setEditTitle(e.target.value)}
										/>
									</label>
								</div>
								<div className="mb-6">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										New Description:
										<textarea
											className="border border-gray-300 p-2 w-full mt-1"
											type="text"
											value={editDescription}
											onChange={(e) => setEditDescription(e.target.value)}
										/>
									</label>
								</div>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Status:
										<select
											className="border border-gray-300 p-2 w-full mt-1"
											value={editStatus}
											onChange={(e) => setEditStatus(e.target.value)}>
											<option value="Todo">Todo</option>
											<option value="In Progress">In Progress</option>
											<option value="Done">Done</option>
										</select>
									</label>
								</div>
								<div className="flex">
									<button
										className="mr-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
										onClick={handleSaveEdit}>
										Save
									</button>
									<button
										className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-700"
										onClick={handleCancelEdit}>
										Cancel
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Notes
