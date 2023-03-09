const express = require("express");
const app = express();
const cors= require('cors');
const Transaction = require("./model/Transactions.js");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();


app.use(cors());
app.use(express.json());
app.get('/api/test', (req,res)=>{
    res.json("test ok")
})



app.post('/api/transactions',async (req,res)=>{
//   mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGO_URI);  
  const{name, description, datetime, price } = req.body;
  //grabbing the information from req.body and providing to transaction model
  const transaction = await Transaction.create({name , description, datetime, price});

    res.json(transaction);
});

app.get("/api/transactions", async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URI);
    const main_transactions = await Transaction.find();
    res.json(main_transactions);
});

app.listen(4040);

