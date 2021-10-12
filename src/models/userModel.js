const mongoose = require('mongoose')

const bcrypt = require('bcrypt');

const {validator} = require('../utils')

const { systemConfig } = require('../configs')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'First name is required'
    },
    lname: {
        type: String,
        required: 'Last name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
        lowercase: true,
        unique: true,
        validate: { validator: validator.validateEmail, message: 'Please fill a valid email address', isAsync: false },
        match: [validator.emailRegex, 'Please fill a valid email address']
    },
    profileImage: {
        type: String,
        required: 'profileImage is required',
    },
    phone: {
        type: String,
        required: 'phone is required',
        unique: true,
        validate: { validator: validator.validatePhone, message: 'Please fill a valid email address', isAsync: false },
        match: [validator.phoneRegex, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'phone is required',
    },
    address: {
        shipping: {
            street: {
                type: String,
                required: 'street is required'
            },
            city: {
                type: String,
                required: 'street is required'
            },
            pincode: {
                type: String,
                required: 'street is required'
            }
        },
        billing: {
            street: {
                type: String,
                required: 'street is required'
            },
            city: {
                type: String,
                required: 'street is required'
            },
            pincode: {
                type: String,
                required: 'street is required'
            }
        }
    }
}, { timestamps: true })

// userSchema.pre('save', async function(next){
//     try{
//         const salt = await bcrypt.genSalt(systemConfig.salt)
//         const hashedPassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedPassword
//         next()
//     }catch (error){
//         next(error)
//     }
// })

module.exports = mongoose.model('User', userSchema, 'User')