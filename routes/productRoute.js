const express = require("express");
const asyncHandler = require("express-async-handler");
const genIdMiddleware = require("../middlewares/genIdMiddleware");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");

const router = express.Router();

/* Middlewares */
router.use(genIdMiddleware);

/* match by title & brand */
router.get(
	"/search",
	asyncHandler(async (req, res) => {
		const query = { $regex: req.query.q, $options: "i" };
		const page = +req.query.page || 1;
		const limit = +req.query.limit || Infinity;
		const products = await Product.find({
			$or: [{ title: query }, { brand: query }],
		})
			.skip((page - 1) * limit)
			.limit(limit);
		res.send(products);
	}),
);

/* Categroy match */
router.get(
	"/category",
	asyncHandler(async (req, res) => {
		const query = { $regex: req.query.q, $options: "i" };
		const page = +req.query.page || 1;
		const limit = +req.query.limit || 20;
		const total_count = await Product.find({
			tags: { $elemMatch: query },
		}).count();
		const products = await Product.find({
			tags: { $elemMatch: query },
		})
			.skip((page - 1) * limit)
			.limit(limit);
		res.send({
			products,
			total_pages: Math.ceil(total_count / limit),
			total_count,
		});
	}),
);

/* filter based on price, rating, discount */
router.get(
	"/filter",
	asyncHandler(async (req, res) => {
		const base = req.query.base || "price";
		const min = req.query.min || 0;
		const max = req.query.max || Infinity;
		const page = +req.query.page || 1;
		const limit = +req.query.limit || 20;
		const total_count = await Product.count();
		const order =
			req.query.order === "asc"
				? { [base]: "1" }
				: req.query.order === "dsc"
				? { [base]: "-1" }
				: 0;

		const products = await Product.find()
			.where(base)
			.gte(min)
			.lte(max)
			.sort(order)
			.skip((page - 1) * limit)
			.limit(limit);
		res.send({
			products,
			total_pages: Math.ceil(total_count / limit),
			total_count,
		});
	}),
);

router.get(
	"/all",
	asyncHandler(async (req, res) => {
		const page = +req.query.page || 1;
		const limit = +req.query.limit || 20;
		const total_count = await Product.count();
		const products = await Product.find()
			.skip((page - 1) * limit)
			.limit(limit);
		res.send({
			products,
			total_pages: Math.ceil(total_count / limit),
			total_count,
		});
	}),
);

/* get a particalar item */

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const _id = req.params.id;
		const product = await Product.findById({ _id });
		res.send(product);
	}),
);

router.get(
	"/seller/:id",
	asyncHandler(async (req, res) => {
		const _id = req.params.id;
		const product = await Seller.findOne({ _id }).select(
			"image name email address createdAt",
		);
		res.send(product);
	}),
);

/* add new product */

router.post(
	"/add",
	asyncHandler(async (req, res) => {
		const seller = req.body.generatedID;
		const product = new Product({ ...req.body, seller });
		const data = await product.save();
		res.send(data);
	}),
);

/* update a product */

router.patch(
	"/:id",
	asyncHandler(async (req, res) => {
		const _id = req.params.id;
		const data = await Product.findOneAndUpdate({ _id }, req.body, {
			returnOriginal: false,
		});
		res.send(data);
	}),
);

/* delete a product */

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const _id = req.params.id;
		const data = await Product.findOneAndDelete({
			_id,
			seller: req.body.seller,
		});
		res.send(data);
	}),
);

/* ******************* Extras  higest time taking */

// /* match category & sizes */

router.get(
	"/match",
	asyncHandler(async (req, res) => {
		const key = Object.keys(req.query)[0];

		const value = Object.values(req.query)[0];
		const query = { $regex: value, $options: "i" };
		const products = await Product.find({
			[key]: { $elemMatch: query },
		});
		res.send(products);
	}),
);

/* Hard match  */
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const query = { $regex: req.query.q, $options: "i" };
		const page = +req.query.page || 1;
		const limit = +req.query.limit || 20;
		const products = await Product.find({
			$or: [
				{ title: query },
				{ brand: query },
				{ description: query },
				{ is_for: query },
				{ for_gender: query },
				{ for_age: query },
			],
		}).skip((page - 1) * limit)
			.limit(limit);;
		res.send(products);
	}),
);

module.exports = router;
