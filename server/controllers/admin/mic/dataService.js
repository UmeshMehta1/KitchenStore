const Order = require("../../../models/orderSchema");
const Product = require("../../../models/productModel");
const User = require("../../../models/userModel")


class DataService{
    async getDatas(req,res){
        const orders = (await Order.find()).length 
        const users = (await User.find()).length 
        const products = (await Product.find()).length
        const allOrders = await Order.find().populate({
            path:"items.product",
            model : "Product"
        }).populate('user')

        res.status(200).json({
            message : "Data fetched successfully",
            data : {
                orders,
                users,
                products,
                allOrders
            }
        })
    }
}
const DataServices = new DataService()
module.exports = DataServices