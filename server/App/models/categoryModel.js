let mongoose=require("mongoose")
let categorySchema= new mongoose.Schema({

    categoryName:{
        type:String,
        unique:true,
        required:true,
        minLength:2,
        maxLength:20,
        lowercase:true
    },

    categoryImage:String,
    categoryOrder:Number,
    categoryStatus:Boolean
})

let categoryModel=mongoose.model("category",categorySchema)
console.log(categoryModel)
module.exports={categoryModel}