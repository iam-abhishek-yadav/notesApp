import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Notes from "./components/Notes"
import LandingPage from "./components/LandingPage"

function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("Authorization")

		if (token) {
			setLoggedIn(true)
		}
	}, [])

	const handleLogin = (token) => {
		localStorage.setItem("Authorization", token)
		setLoggedIn(true)
	}

	const handleLogout = () => {
		localStorage.removeItem("Authorization")
		setLoggedIn(false)
	}

	return (
		<>
			<BrowserRouter>
				<Header
					isLoggedIn={isLoggedIn}
					onLogout={handleLogout}
				/>
				<Routes>
					<Route
						path="/"
						element={<LandingPage isLoggedIn={isLoggedIn} />}
					/>
					<Route
						path="/signup"
						element={<Signup />}
					/>
					<Route
						path="/login"
						element={<Login onLogin={handleLogin} />}
					/>
					<Route
						path="/notes"
						element={<Notes isLoggedIn={isLoggedIn} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
