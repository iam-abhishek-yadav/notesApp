const jwt = require("jsonwebtoken")
const jwtAuth = (req, res, next) => {
	const tokenHeader = req.headers["authorization"]

	if (!tokenHeader) {
		return res.sendStatus(401)
	}

	const [bearer, token] = tokenHeader.split(" ")

	if (bearer !== "Bearer" || !token) {
		return res.sendStatus(401)
	}

	jwt.verify(token, "secret123", (err, user) => {
		if (err) {
			return res.sendStatus(403)
		}

		req.user = user
		next()
	})
}

module.exports = jwtAuth
