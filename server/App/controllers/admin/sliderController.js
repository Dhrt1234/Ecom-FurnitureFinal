const { sliderModel } = require("../../models/sliderModel");
let fs=require("fs")

let sliderInsert = async (req, res) => {

    let { title, sliderOrder } = req.body
    let sliderStatus = true;
    let obj = {
        title,
        sliderOrder,
        sliderStatus
    }
    if (req.file) {
        if (req.file.filename) {
            console.log(req.file.filename)
            obj['sliderImage'] = req.file.filename
        }
    }

    try {

        let sliderRes = await sliderModel.insertOne(obj)
        console.log(sliderRes)
        obj = {
            status: 1,
            msg: "Slider is Saved successfully!!",
            sliderRes
        }
        console.log("success", obj)
        res.send(obj)

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

let sliderView = async (req, res) => {

    let data = await sliderModel.find()
    let obj = {
        status: 1,
        msg: "slider view",
        staticPath:process.env.SLIDERIMAGEPATH,
        data
    }

    res.send(obj)
}

let sliderDelete = async(req,res)=>{

    let {ids} = req.body
    let sliderView= await sliderModel.find({_id:ids}).select("sliderImage")


    for(let v of sliderView){
        let deletePath= "uploads/slider/"+v.sliderImage;
        fs.unlinkSync(deletePath)
    }


    try{
    let data= await sliderModel.deleteMany({_id:ids})
    let obj={
        status:1,
        msg:"Slider is deleted successfully !!!"
    }
    res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "slider does'nt delete",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }
}


let changeStatus = async(req,res)=>{
    let {ids}= req.body
    let data=await sliderModel.updateMany(
        {_id:ids}, [{ $set: {sliderStatus:{$not: "$sliderStatus"}}}]
    )

    let obj={

        status: 1,
        msg: "Status has been changed!!",
        data
    }
    res.send(obj)
}


module.exports = { sliderInsert, sliderView, sliderDelete, changeStatus}