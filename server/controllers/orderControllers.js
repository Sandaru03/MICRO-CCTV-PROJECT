import Order from "../models/order.js";
import Product from "../models/product.js";


export async function createOrder(req,res){

    try{

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

    const items = [];
    let total = 0;

    //check if items are provided and is it an array
    if(req.body.items !=null && Array.isArray(req.body.items)){

        for(let i=0;i<req.body.items.length;i++){

            let item = req.body.items[i];

            let product = await Product.findOne({
                productId : item.productId 
            });

            if(product==null){
                res.status(400).json({
                    message : "Invalid product Id : " + item.productId
                })
                return;
            }

            items[i] = {
                productId : product.productId,
                productName : product.name,
                image : product.images[0],  
                price : product.price,
                qty : item.qty
        }

        total += product.price * item.qty;

    }

    }else{
        res.status(400).json({
            message : "Invalid item format"
        })
        return;
    }

    const newOrder = new Order({
        orderId : orderId,
        email : req.user.email,
        name : req.user.firstName + " " + req.user.lastName,
        address : req.body.address,
        phone : req.body.phone,
        items : items,
        total : total,
       
    });

    const result = await newOrder.save();

    res.json(
        {
            message : "Order Created Successfully",
            result : result
        }
    )
    
}catch(error){
    console.error("Error creating order:", error);
    res.status(500).json({
        message: "Failed to create order",
        error: error.message
    });



}

}


export async function getOrders(req,res){
    if(req.user==null){
        res.status(404).json(
            {
                message : "Please Login to view orders"
            }
        )
        return;
    }

    try{

        if(req.user.role == "admin"){
            const orders = await Order.find().sort({date : -1});
            res.json(orders)
        }else{
            const orders = await Order.find(
                {
                    email : req.user.email
                }
            )
            res.json(orders);
        }


    }catch{
        res.status(500).json(
            {
                message : "Failed to fetch orders"
            }
        )

    }
}