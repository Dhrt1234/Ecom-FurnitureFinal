const { categoryModel } = require("../../models/categoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")


let subcategoryInsert=async (req,res)=>{

    let {subcategoryName,subcategoryOrder,parentCategory}=req.body
    let obj={
        subcategoryName,
        subcategoryOrder,
        parentCategory,
        subcategoryStatus:false
    }

    if(req.file){
        if(req.file.filename){
            obj['subcategoryImage']=req.file.filename
        }
    }
    try{
       
        let subcategoryRes=await subcategoryModel.insertOne(obj)
        obj={
            status:1,
            msg:"sub category Saved successfully!!",
            subcategoryRes
        }
        res.send(obj)
        
    }
    catch(error){
        obj={
            status:0,
            msg:"error comes in sub category.",
            error
        }
        res.send(obj)
    }

  
}


let subcategoryView=async (req,res)=>{

    let data=await subcategoryModel.find().populate('parentCategory','categoryName')
    let obj={
        status:1,
        msg:"Sub Cat View",
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        data
        
    }
    res.send(obj)
}

let parentCategory=async (req,res)=>{
    let data=await categoryModel.find({categoryStatus:true}).select("categoryName")
    let obj={
        status:1,
        data
       
        
    }
    res.send(obj)
}

module.exports={parentCategory,subcategoryInsert,subcategoryView}