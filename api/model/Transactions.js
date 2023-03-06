const mongoose = require("mongoose");

const trasactionSchema = new mongoose.Schema({
    name : {type: String, required : true},
    price : {type : Number, required: true},
    description : {type: String, required : true},
    datetime : {type: Date, required : true}

});

const transactionModel = new mongoose.model("Transaction", trasactionSchema);

module.exports =transactionModel;