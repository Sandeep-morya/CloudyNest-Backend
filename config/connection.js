require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
	try {
		const { connection } = await mongoose.connect(process.env.URL);
		console.log("connected with the database of '" + connection.name + "'");
	} catch (error) {
		console.log("error in making connection");
	}
}

module.exports = connectDB;
