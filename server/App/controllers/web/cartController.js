const { cartModel } = require("../../models/cartModel");

let addToCart = async (req, res) => {
    let { color, id, image, price, qty, title, userId } = req.body;
    let checkproduct = await cartModel.findOne({ productId: id, color, userId })

    let resObj;
    console.log("checkproduct",checkproduct);

    if (checkproduct) {

        resObj = {
            status: 0,
            msg: "Item already into cart!!"
        }
    }
    else {
        let obj = {
            color,
            productId: id,
            image,
            price,
            qty,
            title,
            userId

        }

        let cart = await cartModel.insertOne(obj);
        resObj = {
            status: 1,
            msg: "Item added into cart!!"
        }
        res.send(resObj);
    }

    console.log("resObj", resObj);
}

let userGetCart= async(req,res)=>{
let {userId}=req.body;
let data=await cartModel.find({userId:userId})
let resObj={
    status:1,
    data
}
res.send(resObj);
}

module.exports = { addToCart, userGetCart }