import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddNote from "./AddNote"
import NotesList from "./NotesList"

const Notes = () => {
	const [notes, setNotes] = useState([])
	const navigate = useNavigate()
	useEffect(() => {
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
					setNotes(data)
				} else {
					if (resp.status === 403) {
						navigate("/login")
					}
				}
			} catch (error) {
				console.error(error.message)
			}
		}
		fetchNotes()
	}, [navigate])
	return (
		<div>
			<AddNote />
			<NotesList notes={notes} />
		</div>
	)
}

export default Notes
