const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const {connect} = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());
app.get('/api/test', (req, res) => {
    res.json('test ok333');
});

app.post('/api/transaction', async (req, res) => {
    await connect(process.env.MONGO_URL);
    const {name,description,datetime,price} = req.body;
    const transaction = await Transaction.create({name,description,datetime,price});
    res.json(transaction);
});

app.get('/api/transactions' , async (req, res) => {
    await connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);

});



app.listen(4040);