import { Link } from "react-router-dom"
import { FaSignInAlt, FaUserPlus, FaClipboardList } from "react-icons/fa"
import { useEffect } from "react"

const LandingPage = ({ isLoggedIn }) => {
	useEffect(() => {}, [isLoggedIn])
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h2 className="text-4xl font-bold mb-4">Welcome to the Notes App</h2>
			<p className="text-lg text-gray-700 mb-8">
				{isLoggedIn
					? "Explore your notes and manage your tasks."
					: "Sign up or log in to start managing your notes and tasks."}
			</p>

			<div className="flex space-x-4">
				{isLoggedIn ? (
					<Link
						to="/todos"
						className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
						<FaClipboardList className="mr-2" />
						Go to Notes
					</Link>
				) : (
					<>
						<Link
							to="/signup"
							className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
							<FaUserPlus className="mr-2" />
							Sign Up
						</Link>
						<Link
							to="/login"
							className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
							<FaSignInAlt className="mr-2" />
							Log In
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default LandingPage
