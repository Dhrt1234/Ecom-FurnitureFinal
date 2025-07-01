let express=require("express")
const { userauthRoutes } = require("./userauthRoutes")
const { homepageRoutes } = require("./homepageRoutes")
const { cartRoute } = require("./cartRoutes")
let webRoutes =express.Router()


webRoutes.use("/user", userauthRoutes) //http://localhost:8000/web/user
webRoutes.use("/home", homepageRoutes)
webRoutes.use("/cart",cartRoute);

module.exports={webRoutes}