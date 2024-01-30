import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faUser,
	faSignInAlt,
	faSignOutAlt,
	faBars,
} from "@fortawesome/free-solid-svg-icons"
import notesLogo from "../asset/notesLogo.jpg"

const Header = ({ isLoggedIn, onLogout }) => {
	const [showDropdown, setShowDropdown] = useState(false)

	const handleDropdownToggle = () => {
		setShowDropdown(!showDropdown)
	}

	const handleLogout = () => {
		setShowDropdown(false)
		onLogout()
	}

	return (
		<header className="bg-blue-500 text-white p-4 flex items-center justify-between">
			<Link to="/">
				<div className="flex items-center">
					<img
						src={notesLogo}
						alt="Logo"
						className="w-10 h-10 mr-2 rounded-full"
					/>
					<span className="text-lg font-bold">notes</span>
				</div>
			</Link>

			<nav className="flex items-center">
				{isLoggedIn ? (
					<>
						<Link
							to="/notes"
							className="mx-2 hover:underline">
							Notes
						</Link>
						<div className="relative mx-2">
							<FontAwesomeIcon
								icon={faUser}
								size="lg"
								className="text-white cursor-pointer"
								onClick={handleDropdownToggle}
							/>
							{showDropdown && (
								<div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md text-gray-800">
									<Link
										to="/profile"
										className="block px-4 py-2 hover:bg-gray-200">
										User Profile
									</Link>
									<div
										className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
										onClick={handleLogout}>
										Logout
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<Link
							to="/signup"
							className="mx-2 hover:underline">
							<FontAwesomeIcon
								icon={faSignInAlt}
								size="lg"
								className="text-white"
							/>
							Signup
						</Link>
						<Link
							to="/login"
							className="mx-2 hover:underline">
							<FontAwesomeIcon
								icon={faSignOutAlt}
								size="lg"
								className="text-white"
							/>
							Login
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Header
