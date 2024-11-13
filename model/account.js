const mongoose = require('mongoose');
const User = require("../model/user")
const accountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: Number, required: true, unique: true },
    accountName:{type:String, required:true, unique:true},
    accountType: { type: String, enum: ['savings', 'checking'], required: true, default:'savings' },
    balance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);