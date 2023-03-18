const Favourite = require("../models/favouriteModel")

/*
	This middle finds the tools items array of cart
	and send that as reqestBody.
	so that crud operation can perform cleanly
 */

async function favMiddleware(req, _, next) {
	const { _id } = req.body;
	const { items } = await Favourite.findById({ _id });
	req.body.items = items;
	next();
}

module.exports = favMiddleware;
