const express = require('express');
const { connectDatabase } = require('./database/database');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT||5000;

connectDatabase(process.env.MONGO_URI);

const authRoute = require("./routes/auth/authRoute")


app.use(express.json())
app.use(express.urlencoded({extended : true}))


//
app.use("/api/auth",authRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});