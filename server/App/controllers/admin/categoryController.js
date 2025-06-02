const { categoryModel} = require("../../models/categoryModel")
let fs= require("fs")
let categoryInsert=async(req,res)=>{

 let {categoryName,categoryOrder}=req.body
 let categoryStatus=true;
    let obj={
        categoryName,
        categoryOrder,
        categoryStatus
    }
    if(req.file){
        if(req.file.filename){
            console.log(req.file.filename)
            obj['categoryImage']=req.file.filename
        }
    }

    try{
       
        let categoryRes=await categoryModel.insertOne(obj)
        console.log(categoryRes)
        obj={
            status:1,
            msg:"Category Save successfully!!",
            categoryRes
        }
        console.log("success",obj)
        res.send(obj)
        
    }
    catch(error){
        obj={
            status:0,
            msg:"Category does not save. ",
            error
        }
        console.log("error",obj)
        res.send(obj)
    }


}

let categoryView=async(req,res)=>{

    let data=await categoryModel.find()
    let obj={
        status:1,
        msg:"material view",
        staticPath:process.env.CATEGORYIMAGEPATH,
         data
    }

    res.send(obj)
}

let categoryDelete = async(req,res)=>{
    let {ids} = req.body
    let categoryView= await categoryModel.find({_id: ids}).select("categoryImage")


    for(let v of categoryView){
        let deletePath= "uploads/category/"+ v.categoryImage;
        fs.unlinkSync(deletePath)

    }

    let data = await categoryModel.deleteMany({_id: ids})

    let obj= {
        status:1,
        msg:"Category is deleted successfully!!"
    }

    res.send(obj)
    }

module.exports={categoryInsert, categoryView, categoryDelete}