const express = require("express");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const findMiddleware = require("../middlewares/findMiddleware");
const Cart = require("../models/cartModel");

const router = express.Router();

/* middleware */

router.use(authMiddleware);

router.use(findMiddleware);

/* get Cart Items */

router.get(
	"/",
	asyncHandler(async (req, res) => {
		res.send(req.body.items);
	}),
);

/* Update cart Item */

router.patch(
	"/",
	asyncHandler(async (req, res) => {
		const { _id, items } = req.body;

		const updatedItems = [...items, req.body.data];

		const data = await Cart.findOneAndUpdate(
			{ _id },
			{ items: updatedItems },
			{ returnOriginal: false },
		);

		res.send(data.items);
	}),
);

/* Delete cart Item*/

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const { _id, items } = req.body;

		const updatedItems = items.filter((e) => e.id != req.params.id);

		const data = await Cart.findOneAndUpdate(
			{ _id },
			{ items: updatedItems },
			{ returnOriginal: false },
		).select("items");

		res.send(updatedItems);
	}),
);
/* update a cart Item*/

router.patch(
	"/:id",
	asyncHandler(async (req, res) => {
		const { _id, items } = req.body;

		const updatedItems = items.map((e) =>
			e.id === req.params.id ? { ...e, count: req.body.count } : e,
		);

		const data = await Cart.findOneAndUpdate(
			{ _id },
			{ items: updatedItems },
			{ returnOriginal: false },
		).select("items");

		res.send(updatedItems);
	}),
);
module.exports = router;
