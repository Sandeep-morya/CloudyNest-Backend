require("dotenv").config();
require("./config/connection")();

/* imports */
const express = require("express");
const cors = require("cors");

/* routes import */
const userRouter = require("./routes/userRoute");
const sellerRouter = require("./routes/sellerRoute");
const cartRouter = require("./routes/cartRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const favouriteRouter = require("./routes/favouriteRoute");
const Product = require("./models/productModel");

/* 😂 more variables */
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/orders", orderRouter);
app.use("/favourites", favouriteRouter);

// :: curretly for devs toa add mulitple objects ::

// app.post("/",async(req,res)=>{
// 	const data = await Product.insertMany(req.body)
// 	res.send(data)
// })

app.listen(process.env.PORT, () =>
	console.log("server in running on " + process.env.PORT),
);

/* All API Links

----> USER <---


-[POST]- 	http://localhost:7717/user/register/  		//register-api
-[POST]- 	http://localhost:7717/user/login/  			//login-api
-[GET]- 	http://localhost:7717/user/profile/  		//user-details-api
-[GET]- 	http://localhost:7717/user/orders/  		//user-orders-api
-[PATCH]- 	http://localhost:7717/user/addmore/  		//user-details-change-api

---> SELLER <---


-[POST]- 	http://localhost:7717/seller/register/  	//register-api
-[POST]- 	http://localhost:7717/seller/login/  		//login-api
-[GET]- 	http://localhost:7717/seller/profile/  		//seller-details-api
-[GET]- 	http://localhost:7717/seller/orders/  		//seller-orders-api
-[GET]- 	http://localhost:7717/seller/products/  	//seller-products-api
-[PATCH]- 	http://localhost:7717/seller/addmore/  		//seller-details-change-api

---> PRODUCT <---


-[GET]- 	http://localhost:7717/product/all/  		//get-all-products-api
-[POST]- 	http://localhost:7717/product/add/  		//add-a-product-api
-[PATCH]- 	http://localhost:7717/product/:id/			//update-product-api
-[DELETE]- 	http://localhost:7717/product/:id/			//delete-product-api

---> CART <---


-[GET]- 	http://localhost:7717/cart/  				//get-all-cart-items-api
-[PATCH]- 	http://localhost:7717/cart/					//add-to-cart-api
-[DELETE]- 	http://localhost:7717/cart/					//delete-cart-item-api

---> FAVOURITES <---


-[GET]- 	http://localhost:7717/favourites/  				//get-all-favourites-items-api
-[PATCH]- 	http://localhost:7717/favourites/					//add-to-favourites-api
-[DELETE]- 	http://localhost:7717/favourites/					//delete-favourites-item-api

---> ORDER <---

-[POST]- 	http://localhost:7717/orders/  				//book-a-order-api
-[PATCH]- 	http://localhost:7717/orders/:id/			//update-the-order-api


*/
