let express=require("express")
const { userauthRoutes } = require("./userauthRoutes")
let webRoutes =express.Router()


webRoutes.use("/user", userauthRoutes) //http://localhost:8000/web/user
module.exports={webRoutes}