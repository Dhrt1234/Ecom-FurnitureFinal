let express=require("express");
let mongoose=require("mongoose")// for database
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let app=express();
let cors=require("cors");
app.use(cors())
app.use(express.json())
require("dotenv").config()// for imp credentials files
app.use("/admin",adminRoutes)//http://localhost:8000/admin
app.use("/uploads/category", express.static("uploads/category"))
app.use("/uploads/slider", express.static("uploads/slider"))
app.use("/uploads/whychoose", express.static("uploads/whychoose"))
app.use("/uploads/testimonial", express.static("uploads/testimonial"))
app.use("/uploads/subcategory", express.static("uploads/subcategory"))
app.use("/uploads/sub_subcategory", express.static("uploads/sub_subcategory"))

mongoose.connect('mongodb://127.0.0.1:27017/ecomFurniture')// database connectivity
.then((res)=>{
console.log("DB connect")
app.listen(process.env.PORT)
//http://localhost:8000
})