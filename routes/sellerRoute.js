require("dotenv").config();
const express = require("express");
const Seller = require("../models/sellerModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const router = express.Router();

/* middleware */

router.use(authMiddleware);

/* Register */

router.post(
	"/register",
	asyncHandler(async (req, res) => {
		const email = req.body.email;
		const emailExists = await Seller.findOne({ email });
		if (emailExists) {
			res.send("Email ID already Registered");
			return;
		}

		const mobile = req.body.mobile;
		const mobileExists = await Seller.findOne({ mobile });
		if (mobileExists) {
			res.send("Mobile Numeber already Registered");
			return;
		}

		const hasedPassword = await bcrypt.hash(String(req.body.password), 5);

		const seller = await new Seller({ ...req.body, password: hasedPassword });

		const { _id } = await seller.save();

		const token = jwt.sign(_id.toString(), process.env.SECERT);
		res.send({ error: false, token });
	}),
);

/* Login */

router.post(
	"/login",
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		const seller = await Seller.findOne({ email });
		if (!seller) {
			res.send("Above Email is not registered with us");
			return;
		}
		/* else */

		const auth = await bcrypt.compare(String(password), seller.password);

		if (!auth) {
			res.send("Oopss.. you have enterd a wrong password");
			return;
		}

		const token = jwt.sign(seller._id.toString(), process.env.SECERT);
		res.send({ error: false, token });
	}),
);

/*  Find Seller Profile */

router.get(
	"/profile",
	asyncHandler(async (req, res) => {
		const { _id } = req.body;
		const seller = await Seller.findById({ _id }).select("-password");
		if (!seller) throw new Error("Seller Not Found");
		res.send(seller);
	}),
);

/* find products of seller */
router.get(
	"/products",
	asyncHandler(async (req, res) => {
		const { _id } = req.body;
		const products = await Product.find({ seller: _id });
		res.send(products);
	}),
);

/* find orders of seller */

router.get(
	"/orders",
	asyncHandler(async (req, res) => {
		const { _id } = req.body;
		const orders = await Order.find({ seller: _id });
		res.send(orders);
	}),
);

/* add additonal details */

router.patch(
	"/addmore",
	asyncHandler(async (req, res) => {
		const { _id } = req.body;
		const seller = await Seller.findOneAndUpdate({ _id }, req.body, {
			returnOriginal: false,
		}).select("-password");
		if (!seller) throw new Error("Seller Not Found");
		res.send(seller);
	}),
);

module.exports = router;
