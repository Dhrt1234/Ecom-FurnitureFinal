const { register } = require("../../controllers/web/userauthController");

express=require("express");
userauthRoutes=express.Router();

userauthRoutes.post('/register', register)
module.exports={userauthRoutes}