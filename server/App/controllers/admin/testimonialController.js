let fs= require("fs");
const { testimonialModel } = require("../../models/testimonialModel");

 let testimonialInsert= async(req,res)=>{
    let {name,designation,rating,order,message} = req.body
    let status= true;

    let insertobj={

        name,
        designation,
        rating,
        order,
        message,
        status
    }

    if(req.file){
        if(req.file.filename){
            console.log("filename", req.file.filename)
            insertobj['userImage']=req.file.filename
        }
    }

    try{

        let obj;
        let finalRes= await testimonialModel.insertOne(insertobj);
        console.log(finalRes)
        obj={
            status: 1,
            msg:"Testimonial is saved successfully!!!",
            finalRes 
        }

        console.log("success",obj);
        res.send(obj);
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "slider name already exist...",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }
 }

 module.exports={testimonialInsert}