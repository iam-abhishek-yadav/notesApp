import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Notes = ({ isLoggedIn }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [isLoggedIn, navigate])

	return (
		<div>
			{isLoggedIn ? (
				<div>Notes</div>
			) : (
				<p>You are not authenticated. Redirecting to login...</p>
			)}
		</div>
	)
}

export default Notes
