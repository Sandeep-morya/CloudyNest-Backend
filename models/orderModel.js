const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

/*  Order Model Fields
	- userID
	- items

 */

const orderSchema = mongoose.Schema(
	{
		/* stage 1 */
		item: { type: ObjectId, ref: "product" },
		customer: { type: ObjectId, ref: "user" },
		seller: { type: ObjectId, ref: "seller" },
		quantity: { type: Number, default: 1 },
		delivery_address: { type: String },
		amount: { type: Number, required: true },
		payment_method: { type: String, required: true },
		payment_status: { type: Boolean, required: true },
		/* stage 2 */
		current_location: { type: String, default: "" },
		track_id: { type: Number, default: "" },
		delivery_status: { type: Boolean, default: false },

		/* stage 3 */
		canceled: { type: Boolean, default: false },
		returned: { type: Boolean, default: false },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
