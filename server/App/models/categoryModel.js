let mongoose=require("mongoose")
const {default: slugify} = require("slugify")

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
    categoryStatus:Boolean,
    slug:String
})

categorySchema.pre('save', function (next){
    this.slug= slugify(this.categoryName, {lower: true});
    next();
}); 

let categoryModel=mongoose.model("category",categorySchema)
console.log(categoryModel)
module.exports={categoryModel}