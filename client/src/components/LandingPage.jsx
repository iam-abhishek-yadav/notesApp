import { Link } from "react-router-dom"

const LandingPage = ({ isLoggedIn }) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h2 className="text-4xl font-bold mb-4">Welcome to the Notes App</h2>
			<p className="text-lg text-gray-700 mb-8 text-center">
				{isLoggedIn
					? "Explore your notes and manage your tasks"
					: "Sign up or log in to start managing your notes and tasks"}
			</p>
			{isLoggedIn ? (
				<>
					<Link
						to="/notes"
						className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
						Go to Notes
					</Link>
				</>
			) : (
				<div className=" flex space-x-4">
					<Link
						to="/signup"
						className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
						Sign Up
					</Link>
					<Link
						to="/login"
						className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
						Log In
					</Link>
				</div>
			)}
		</div>
	)
}

export default LandingPage
