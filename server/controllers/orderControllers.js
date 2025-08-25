import Order from "../models/order.js";

export async function createOrder(req,res){
    if(req.user==null){
        res.status(404).json(
            {
                message : "Please Login to create an order"
            }
        )
        return;
    }

    const latestOrder = await Order.find().sort({date : -1}).limit(1);

    let orderId = "CBC00202"

    if(latestOrder.length>0){
        const latestOrderIdInString = latestOrder[0].orderId;
        const lastOrderIdWithoutPrefix = latestOrderIdInString.replace("CBC","");
        const lastOrderIdInteger = parseInt(lastOrderIdWithoutPrefix);
        const newOrderIdInteger = lastOrderIdInteger + 1;
        const newOrderIdWithoutPrefix = newOrderIdInteger.toString().padStart(5,'0');
        orderId = "CBC" + newOrderIdWithoutPrefix;
    }

    const newOrder = new Order({
        orderId : orderId,
        email : req.user.email,
        name : req.user.firstName + " " + req.user.lastName,
        address : req.body.address,
        phone : req.body.phone,
        items : [],
       
    });

    const result = await newOrder.save();

    res.json(
        {
            message : "Order Created Successfully",
            result : result
        }
    )


}

    