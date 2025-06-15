const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")


let parentCategory=async (req,res)=>{
    let data=await categoryModel.find().select("categoryName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
    console.log(obj);
}

let subCategory=async (req,res)=>{
    let {parentid}=req.params; ///68374556e568bbcaa6ba031b
    let data=await subcategoryModel.find( {parentCategory:parentid} ).select("subcategoryName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
}
let sub_subCategory=async (req,res)=>{
    let {subcatid}=req.params; ///68374556e568bbcaa6ba031b
    let data=await sub_subcategoryModel.find( {subCategory:subcatid} ).select("sub_subcatName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
    console.log(data)
}

let getColor=async (req,res)=>{
    let data=await colorModel.find({colorStatus:true}).select("colorName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
}
let getMeterial=async (req,res)=>{
    let data=await  materialModel.find({materialStatus:true}).select("materialName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
}
module.exports={parentCategory,subCategory,sub_subCategory,getColor,getMeterial}