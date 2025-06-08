const express = require('express');
const { connectDatabase } = require('./database/database');
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/productRoute");
const adminUsersRoute = require("./routes/admin/adminUsersRoute");
const adminOrdersRoute = require("./routes/admin/adminOrderRoute");
const orderRoute = require("./routes/user/orderRoute");
const cartRoute = require("./routes/user/cartRoute");
const reviewRoute = require("./routes/user/reviewRoute");
const profileRoute = require("./routes/user/profileRoute");
const cors = require("cors");

// const cors = require("cors")
const app = express();

require('dotenv').config();

const PORT = process.env.PORT||5000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())

connectDatabase(process.env.MONGO_URI);

app.use("/uploads", express.static("uploads"));


app.get(("/reg",(req,res)=>{
    res.send("Welcome to the registration page")
}   ))


app.use("/api/auth/",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/admin",adminOrdersRoute)
app.use("/api/orders",orderRoute)
app.use("/api/cart",cartRoute)
app.use("/api/reviews",reviewRoute)
app.use("/api/profile", profileRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});