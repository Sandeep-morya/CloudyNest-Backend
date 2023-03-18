require('dotenv').config();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
	if (req.method === "POST") {
		next();
	} else {
		const token = req.headers.authorization;
		try {
			if (!token) throw new Error("Please Provide the Token in Headers");
			const decoded = jwt.verify(token, process.env.SECERT);
			req.body._id = decoded;
			next();
		} catch (error) {
			res.status(405).send(error);
		}
	}
}

module.exports = authMiddleware;
