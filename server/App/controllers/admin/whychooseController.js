const { whychooseModel } = require("../../models/whychooseModel");

let fs= require("fs")
let whychooseInsert=async(req,res)=>{

 let {title,order,description}=req.body
 let whychooseStatus=true;
    let obj={
        title,
        order,
        description,
        whychooseStatus
    }
 
    if(req.file){
        if(req.file.filename){
            console.log(req.file.filename)
            obj['userImage']=req.file.filename
        }
    }

       console.log(obj)

    try{
       
        let whychooseRes=await whychooseModel.insertOne(obj)
        console.log(whychooseRes)
        obj={
            status:1,
            msg:"Why choose Save successfully!!",
            whychooseRes
        }
        console.log("success",obj)
        res.send(obj)
        
    }
    catch(error){
        obj={
            status:0,
            msg:"Why choose already exist...",
            error
        }
        console.log("error",obj)
        res.send(obj)
    }


}

let whychooseView = async(req, res)=>{
    
    let data = await whychooseModel.find()
    let obj={
        status:1,
        msg:"whychoose view",
        staticPath:process.env.WHYCHOOSEIMAGEPATH,
        data
    }

    res.send(obj)
}

let whychooseDelete = async(req,res)=>{

    let {ids} = req.body
    let whychooseView= await whychooseModel.find({_id:ids}).select("userImage")


    for(let v of whychooseView){
        let deletePath= "uploads/whychoose/"+v.userImage;
        fs.unlinkSync(deletePath)
    }


    try{
    let data= await whychooseModel.deleteMany({_id:ids})
    let obj={
        status:1,
        msg:"Why choose is deleted successfully !!!"
    }
    res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "why choose does'nt delete",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }
}

module.exports={whychooseInsert, whychooseView, whychooseDelete}