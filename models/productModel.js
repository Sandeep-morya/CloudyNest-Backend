const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

/*  Product Model Fields
	- title
	- description
	= thumbnail
	- images
	- price
	- tags
	- quantity
	- seller
	- assured
	- rating
 */

const productSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		brand: { type: String, required: true },
		description: { type: String, required: true },
		thumbnail: { type: String, required: true },
		images: [{ type: String, required: true }],
		price: { type: Number, required: true },
		tags: [{ type: String, required: true }],

		quantity: { type: Number, default: 1 },
		discount: { type: Number, default: 0 },
		seller: { type: ObjectId, ref: "seller" },
		rating: { type: Number, default: 3 },

		/* Extras */
		assured: { type: Boolean, default: false },
		is_for: { type: String, default: "every" }, //mens/children/girls/oldies/every
		for_gender: { type: String, default: "every" }, //male/female/trans/every
		for_age: { type: String, default: "0-100" }, // 0-2,3-5, 5-8 etc..
		sizes: [{ type: String, default: [] }], // all types of sizes
	},
	{ timestamps: true },
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
