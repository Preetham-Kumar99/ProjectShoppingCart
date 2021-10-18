// const mongoose = require('mongoose')

// const bcrypt = require('bcrypt');

// const {validator} = require('../utils')

// const { systemConfig } = require('../configs')

// const userSchema = new mongoose.Schema({
//     title: {
//         type: String, 
//         required: "title is required", 
//         unique: true
//     },
//   description: {
//       type: String, 
//       required: "description is required",
//     },
//   price: {
//       type: Number, 
//       required: "description is required",, valid number/decimal},
//   currencyId: {string, mandatory, INR},
//   currencyFormat: {string, mandatory, Rupee symbol},
//   isFreeShipping: {boolean, default: false},
//   productImage: {string, mandatory},  // s3 link
//   style: {string},
//   availableSizes: {array of string, at least one size, enum["S", "XS","M","X", "L","XXL", "XL"]},
//   installments: {number},
//   deletedAt: {Date, when the document is deleted}, 
//   isDeleted: {boolean, default: false},
// }, { timestamps: true })

// module.exports = mongoose.model('User', userSchema, 'User')