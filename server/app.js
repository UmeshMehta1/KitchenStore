const express = require('express');
const { connectDatabase } = require('./database/database');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});