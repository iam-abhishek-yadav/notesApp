import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ onLogin }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [status, setStatus] = useState(null)
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	const handleLogin = async () => {
		setStatus(null)
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})

			if (response.ok) {
				const data = await response.json()
				onLogin(data.token)
				setStatus({
					type: "success",
					message: "Login successful",
				})
				navigate("/notes")
			} else {
				const data = await response.json()
				if (data.error && data.error === "Invalid credentials") {
					setErrors({ general: data.error })
				} else {
					setStatus({
						type: "error",
						message: `Error logging in: ${data.error}`,
					})
				}
			}
		} catch (error) {
			setStatus({
				type: "error",
				message: `Error logging in: ${error.message}`,
			})
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 shadow-md rounded-md w-96">
				<h2 className="text-2xl font-semibold mb-4">Login</h2>
				{status && (
					<div
						className={`mb-4 ${
							status.type === "success" ? "text-green-500" : "text-red-500"
						}`}>
						{status.message}
					</div>
				)}
				{errors.general && (
					<div className="mb-4 text-red-500">{errors.general}</div>
				)}
				<form>
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
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs mt-1">{errors.password}</p>
							)}
						</label>
					</div>
					<button
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
						type="button"
						onClick={handleLogin}>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
