let express = require("express");
const { checkToken } = require("../../middleware/checkToken");
const { saveOrder } = require("../../controllers/web/orderController");

let orderRoutes = express.Router();

orderRoutes.post('/order-place', checkToken, saveOrder);


module.exports = { orderRoutes }