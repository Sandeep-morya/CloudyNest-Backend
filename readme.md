# CloudyNest

### An online shopping Website

[Live URL](https://cloudynest.vercel.app/)

` Server API Links`

----> USER <---

- [POST]- http://localhost:PORT/user/register/ //register-api
- [POST]- http://localhost:PORT/user/login/ //login-api
- [GET]- http://localhost:PORT/user/profile/ //user-details-api
- [GET]- http://localhost:PORT/user/orders/ //user-orders-api
- [PATCH]- http://localhost:PORT/user/addmore/ //user-details-change-api

---> SELLER <---

- [POST]- http://localhost:PORT/seller/register/ //register-api
- [POST]- http://localhost:PORT/seller/login/ //login-api
- [GET]- http://localhost:PORT/seller/profile/ //seller-details-api
- [GET]- http://localhost:PORT/seller/orders/ //seller-orders-api
- [GET]- http://localhost:PORT/seller/products/ //seller-products-api
- [PATCH]- http://localhost:PORT/seller/addmore/ //seller-details-change-api

---> PRODUCT <---

- [GET]- http://localhost:PORT/product/all/ //get-all-products-api
- [GET]- http://localhost:PORT/product/:id/ //get-a-sigle-products-api
- [GET]- http://localhost:PORT/product/seller/:id/ //get-about-of-supplier-of-a-products-api
- [POST]- http://localhost:PORT/product/add/ //add-a-product-api
- [PATCH]- http://localhost:PORT/product/:id/ //update-product-api
- [DELETE]- http://localhost:PORT/product/:id/ //delete-product-api

---> CART <---

- [GET]- http://localhost:PORT/cart/ //get-all-cart-items-api
- [PATCH]- http://localhost:PORT/cart/ //add-to-cart-api
- [DELETE]- http://localhost:PORT/cart/ //delete-cart-item-api

---> FAVOURITE <---

- [GET]- http://localhost:PORT/favourites/ //get-all-favourites-items-api
- [PATCH]- http://localhost:PORT/favourites/ //add-to-favourites-api
- [DELETE]- http://localhost:PORT/favourites/ //delete-favourites-item-api

---> ORDER <---

- [POST]- http://localhost:PORT/orders/ //book-a-order-api
- [PATCH]- http://localhost:PORT/orders/:id/ //update-the-order-api
