const express = require("express");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const favMiddleware = require("../middlewares/favMiddleware");
const Favourite = require("../models/favouriteModel")

const router = express.Router();

/* middleware */

router.use(authMiddleware);

router.use(favMiddleware);

/* get Cart Items */

router.get(
	"/",
	asyncHandler(async (req, res) => {
		res.send(req.body.items);
	}),
);

/* Update cart Itmes */

router.patch(
	"/",
	asyncHandler(async (req, res) => {
		const { _id, items, productID } = req.body;

		const updatedItems = [...items, productID];

		const data = await Favourite.findOneAndUpdate(
			{ _id },
			{ items: updatedItems },
			{ returnOriginal: false },
		);

		res.send(data.items);
	}),
);

/* Delete cart Itmes */

router.delete(
	"/",
	asyncHandler(async (req, res) => {
		const { _id, items, productID } = req.body;

		const updatedItems = items.filter(e=>e!=productID)

		const data = await Favourite.findOneAndUpdate(
			{ _id },
			{ items: updatedItems },
			{ returnOriginal: false },
		).select("items");

		res.send(data.items);
	}),
);

module.exports = router;
