const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

/*  Seller Model Fields
	- name
	- email
	= password
	- address
	- products
	- income
 */

const sellerSchema = mongoose.Schema(
	{
		image: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		mobile: { type: String, required: true, unique: true },
		address: { type: String, required: true },
		gst: { type: String, required: true },
		/* Extras */

		isPrime: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const Seller = mongoose.model("seller", sellerSchema);

module.exports = Seller;
