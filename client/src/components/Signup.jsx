import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [status, setStatus] = useState(null)
	const [errors, setErrors] = useState({})
	const [passwordStrength, setPasswordStrength] = useState(0)
	const navigate = useNavigate()

	const checkPasswordStrength = (value) => {
		const length = value.length
		const hasUpperCase = /[A-Z]/.test(value)
		const hasLowerCase = /[a-z]/.test(value)
		const hasNumbers = /\d/.test(value)
		const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value)

		const strength =
			(length >= 8 ? 1 : 0) +
			(hasUpperCase ? 1 : 0) +
			(hasLowerCase ? 1 : 0) +
			(hasNumbers ? 1 : 0) +
			(hasSymbols ? 1 : 0)
		return strength
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
		const strength = checkPasswordStrength(e.target.value)
		setPasswordStrength(strength)
	}

	const handleSignup = async () => {
		try {
			const response = await fetch("http://localhost:3000/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			})

			if (response.ok) {
				setStatus({
					type: "success",
					message: "User registered successfully",
				})
				navigate("/login")
			} else {
				const data = await response.json()
				if (data.error && data.error === "Invalid input data") {
					setErrors(data.validationErrors || {})
				} else {
					setStatus({
						type: "error",
						message: `Error registering user: ${data.error}`,
					})
				}
			}
		} catch (error) {
			setStatus({
				type: "error",
				message: `Error registering user: ${error.message}`,
			})
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 shadow-md rounded-md w-96">
				<h2 className="text-2xl font-semibold mb-4">Signup</h2>
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
							Username:
							<input
								className={`border ${
									errors.username ? "border-red-500" : "border-gray-300"
								} p-2 w-full mt-1`}
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							{errors.username && (
								<p className="text-red-500 text-xs mt-1">{errors.username}</p>
							)}
						</label>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email:
							<input
								className={`border ${
									errors.email ? "border-red-500" : "border-gray-300"
								} p-2 w-full mt-1`}
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1">{errors.email}</p>
							)}
						</label>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password:
							<input
								className={`border ${
									errors.password ? "border-red-500" : "border-gray-300"
								} p-2 w-full mt-1`}
								type="password"
								value={password}
								onChange={handlePasswordChange}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs mt-1">{errors.password}</p>
							)}
						</label>
						{password && (
							<div>
								<div className="flex items-center mt-2">
									<div
										className={`h-2 w-full ${
											passwordStrength === 5
												? "bg-green-500"
												: passwordStrength >= 3
												? "bg-yellow-500"
												: "bg-red-500"
										}`}></div>
								</div>
								<p className="text-xs mt-1">
									Password Strength:{" "}
									{passwordStrength === 5
										? "Strong"
										: passwordStrength >= 3
										? "Medium"
										: "Weak"}
								</p>
							</div>
						)}
					</div>
					<button
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
						type="button"
						onClick={handleSignup}>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	)
}

export default Signup
