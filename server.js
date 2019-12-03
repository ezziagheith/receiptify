const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

require('dotenv').config();



// --------- ROUTES -----------// 

app.get('/', (req, res) => {
    res.send('<h1>RECEIPTIFY</h1>');
});


app.listen(process.env.PORT || 4000, () => console.log(`Server connected at http://localhost:${PORT}`));