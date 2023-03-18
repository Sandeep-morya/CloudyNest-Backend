const Cart = require("../models/cartModel");

/*
	This middle finds the tools items array of cart
	and send that as reqestBody.
	so that crud operation can perform cleanly
 */

async function findMiddleware(req, _, next) {
	const { _id } = req.body;
	const { items } = await Cart.findById({ _id });
	req.body.items = items;
	next();
}

module.exports = findMiddleware;
