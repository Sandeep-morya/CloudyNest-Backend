const mongoose = require("mongoose");

/* here i am using types provided by Mongoose */
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

/*  Favourite Model Fields
	- userID
	- items

 */

const favouriteSchema = mongoose.Schema({
	_id: { type: ObjectId, required: true },
	items: [{ type: ObjectId, ref: "product", default: [] }],
});

const Favourite = mongoose.model("favourite", favouriteSchema);

module.exports = Favourite;
