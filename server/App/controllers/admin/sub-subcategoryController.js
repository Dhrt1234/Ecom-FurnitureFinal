const { categoryModel } = require("../../models/categoryModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")



let sub_subcategoryInsert=async (req,res)=>{

    let {sub_subcatName,sub_subcatOrder,parentCategory,subCategory}=req.body
    let obj={
        sub_subcatName,
        sub_subcatOrder,
        parentCategory,
        subCategory,
        sub_subcatstatus:true
    }

    if(req.file){
        if(req.file.filename){
            obj['sub_subcatImage']=req.file.filename
        }
    }
    try{
       
        let sub_subcatRes=await sub_subcategoryModel.insertOne(obj)
        obj={
            status:1,
            msg:"sub subcategory Saved successfully!!",
            sub_subcatRes
        }
        res.send(obj)
        console.log(obj)
    }
    catch(error){
        obj={
            status:0,
            msg:"error comes in sub sub category.",
            error
        }
        res.send(obj)
    }

  
}

/* 
let subcategoryView=async (req,res)=>{

    let data=await sub_subcategoryModel.find().populate('parentCategory','categoryName')
    let obj={
        status:1,
        msg:"Sub Cat View",
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        data
        
    }
    res.send(obj)
} */

let parentCategory=async (req,res)=>{
    let data=await categoryModel.find({categoryStatus:true}).select("categoryName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
}

let subCategoryData=async (req,res)=>{
    let { parentId } = req.params;
    console.log("pid",parentId)
    try{
    let data=await subcategoryModel.find({parentCategory:parentId, subcategoryStatus:true}).select("subcategoryName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
    console.log(data)
}
 catch(error){
        obj={
            status:0,
            msg:"error comes in single sub category view.",
            error
        }
        res.send(obj)
    }

}
let sub_subcategoryView=async (req,res)=>{

    let data=await sub_subcategoryModel.find()
    .populate({
        path:"subCategory",
        populate:{
            path:"parentCategory"
        }
    })
    let obj={
        status:1,
        msg:"Sub SubCategory  View",
        staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
        data
        
    }
    res.send(obj)
}

module.exports={parentCategory,sub_subcategoryInsert,subCategoryData , sub_subcategoryView}