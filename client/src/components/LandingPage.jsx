import { Link } from "react-router-dom"

const LandingPage = ({ isLoggedIn }) => {
	return (
		<div className="flex items-center justify-center h-screen overflow-hidden">
			<div className="flex flex-col items-center">
				<h2 className="text-4xl font-bold mb-4">Save your thoughts, wherever you are</h2>
				<p className="text-lg text-gray-700 mb-8 text-center">
					{isLoggedIn
						? "Explore your notes and manage your tasks"
						: "SignUp or LogIn to start taking notes"}
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
					<div className="flex space-x-4">
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
		</div>
	)
}

export default LandingPage
