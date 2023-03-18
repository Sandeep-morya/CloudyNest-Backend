const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Boolean, ObjectId } = mongoose.Schema.Types;

/*  User Model Fields
	- name
	- email
	= password
	- address
	- isPrime
	- pending
	- completed
 */

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		mobile: { type: String, default: "" },
		password: { type: String, required: true },
		address: [{ type: String, default: [] }],
		/* Extras */
		isPrime: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
