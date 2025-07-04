const orderModel = require("../../models/orderModels")
const Razorpay = require('razorpay');
var instance = new Razorpay({
   key_id: 'rzp_test_WAft3lA6ly3OBc',
   key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});


let saveOrder = async (req, res) => {
   let { paymentMethod } = req.body
   let { shippingAddress } = req.body
   let obj = { ...req.body }
   if (paymentMethod == 1) { //COD

      obj['orderStatus'] = 'process'

      await orderModel.insertOne(obj);
      //Delete Cart Items CartModel
      res.send({ status: 1, msg: "Order Save", paymentMethod })

   }
   else {  //Online
      //DB Order Create
      obj['orderStatus'] = 'pending'
      obj['paymentStatus'] = '1' //pending
      let orderData = await orderModel.insertOne(obj) //order insert in DB mongo DB
      //RazorPay
      //Amount 500*100,
      //"currency": "INR",
      //"receipt": orderData._id,

      let orderObj = {
         "amount": req.body.orderAmount * 100, //( in rozorpay amount count is paisa not rupee so we have to multipy 100)
         "currency": "INR",
         "receipt": orderData._id
      }
      //order create in razorpay account not in DB
      let ordersRes = await instance.orders.create(orderObj)
      console.log("res from razor",ordersRes);


      console.log(await orderModel.updateOne({ _id: orderData._id }, {
         $set: {
            razorpayOrderId: ordersRes.id //here we can add razorpayOrderId in DB beacause until this we can not create razorpay ID in DB and using it wecan verify user for payment.
         }
      }))


      res.send({ status: 1, msg: "Order Save", paymentMethod, ordersRes })

   }
}

module.exports = { saveOrder }