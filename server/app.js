const express = require('express');
const app = express();

const Port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});