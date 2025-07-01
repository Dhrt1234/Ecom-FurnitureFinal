let express = require("express");
const { checkToken } = require("../../middleware/checkToken");
const { addToCart, userGetCart } = require("../../controllers/web/cartController");
let cartRoute = express.Router();

cartRoute.post('/add-to-cart', checkToken, addToCart);
cartRoute.post('/userCart', checkToken, userGetCart);
module.exports = { cartRoute }
