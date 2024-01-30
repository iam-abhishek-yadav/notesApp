import { Link } from "react-router-dom"
import notesLogo from "../asset/notesLogo.jpg"

const Header = ({ isLoggedIn, onLogout }) => {
	return (
		<header className="bg-blue-500 text-white p-4 flex items-center justify-between">
			<Link to="./">
				<div className="flex items-center">
					<img
						src={notesLogo}
						alt="logo"
						className="w-10 h-10 mr-2 rounded-full"
					/>
					<span className="text-lg font-bold">notes</span>
				</div>
			</Link>
			<nav className="flex items-center">
				{!isLoggedIn ? (
					<>
						<Link
							to="./signup"
							className="mx-2">
							SignUp
						</Link>
						<Link
							to="./login"
							className="mx-2">
							LogIn
						</Link>
					</>
				) : (
					<>
						<Link
							to="./notes"
							className="mx-2">
							Notes
						</Link>
						<Link to="./">
							<div className="relative mx-2">
								<button
									onClick={onLogout}
									className="focus:outline-none">
									LogOut
								</button>
							</div>
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Header
