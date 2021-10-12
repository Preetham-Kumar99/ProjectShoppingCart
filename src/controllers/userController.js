const multer = require('multer')

const bcrypt = require('bcrypt');

const { validator, aws } = require('../utils')

const {systemConfig} = require('../configs')

const {userModel} = require('../models');

const registerUser = async function (req, res) {
    try {
        const requestBody = req.body.json;

        const files = req.files

        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide User details' })
            return
        };

        let {fname, lname, email, phone, password, address, bothAddressSame } = JSON.parse(requestBody.trim());

        // Validation Starts

        if (!validator.isValid(fname)){
            res.status(400).send({ status: false, message: 'Full Name is Required' })
            return
        };

        if (!validator.isValid(lname)){
            res.status(400).send({ status: false, message: 'Last Name is Required' })
            return
        };

        if (!validator.isValid(email)){
            res.status(400).send({ status: false, message: 'Email is Required' })
            return
        };

        if (!validator.isValid(phone)){
            res.status(400).send({ status: false, message: 'Phone is Required' })
            return
        };

        if (!validator.isValid(password)){
            res.status(400).send({ status: false, message: 'Password is Required' })
            return
        };

        if (!validator.isValid(address)){
            res.status(400).send({ status: false, message: 'address is Required' })
            return
        };

        if (!validator.isValid(address.shipping)){
            res.status(400).send({ status: false, message: 'Shipping address is Required' })
            return
        };
        
        if (!validator.isValid(address.billing)){
            res.status(400).send({ status: false, message: 'Billing address is Required' })
            return
        };  

        if (!validator.isValid(address.shipping.street)){
            res.status(400).send({ status: false, message: 'Shipping street address is Required' })
            return
        };  
        
        if (!validator.isValid(address.shipping.city)){
            res.status(400).send({ status: false, message: 'Shipping city address is Required' })
            return
        };  
        
        if (!validator.isValid(address.shipping.pincode)){
            res.status(400).send({ status: false, message: 'Shipping pincode address is Required' })
            return
        };  

        if(bothAddressSame == 'true'){
           if (!Object.prototype.hasOwnProperty.call(address, billing)) address['billing'] = {}
           address["billing"]['street'] = address.shipping.street
           address["billing"]['city'] = address.shipping.city
           address["billing"]['pincode'] = address.shipping.street
        }
        
        if (!validator.isValid(address.billing.street)){
            res.status(400).send({ status: false, message: 'Billing street address is Required' })
            return
        };  
        
        if (!validator.isValid(address.billing.city)){
            res.status(400).send({ status: false, message: 'Billing city address is Required' })
            return
        };  
        
        if (!validator.isValid(address.billing.pincode)){
            res.status(400).send({ status: false, message: 'Billing pincode address is Required' })
            return
        }; 

        if(!validator.isValid(files[0])){
            res.status(400).send({status:false, message: 'Bookcover is required'})
            return
        }

        // Parameter type Check

        if(!validator.isValidString(fname)){
            res.status(400).send({status: false, message: 'FullName Should be a string'})
            return
        };

        if(!validator.isValidString(lname)){
            res.status(400).send({status: false, message: 'LastName Should be a string'})
            return
        };

        if(!validator.validateEmail(email)){
            res.status(400).send({status: false, message: 'Email is not a Valid Email'})
            return
        };

        if(!validator.validatePhone(phone)){
            res.status(400).send({status: false, message: 'Phone should be a valid phone no and should be a indian phone no'})
            return
        };

        let isEmailAlreadyInUse = await userModel.find({email})

        if(isEmailAlreadyInUse) {
            res.status(400).send({Status: false, msg: "Email Already exists" })
            return
        };

        let isPhoneAlreadyInUse = await userModel.find({phone})

        if(isPhoneAlreadyInUse) {
            res.status(400).send({Status: false, msg: "Phone Already exists" })
            return
        };        

        if(!validator.isValidString(password)){
            res.status(400).send({status: false, message: 'Password Should be a string'})
            return
        };

        if(!validator.PasswordLength(password)){
            res.status(400).send({status: false, message: 'Password length should be in range of 8-15'})
            return
        };

        if (!validator.isValidString(address.shipping.street)){
            res.status(400).send({ status: false, message: 'Shipping street address Should be a string' })
            return
        };  
        
        if (!validator.isValidString(address.shipping.city)){
            res.status(400).send({ status: false, message: 'Shipping city address Should be a string' })
            return
        };  
        
        if (!validator.isValidString(address.shipping.pincode)){
            res.status(400).send({ status: false, message: 'Shipping pincode address Should be a string' })
            return
        }; 

        if (!validator.isValidString(address.billing.street)){
            res.status(400).send({ status: false, message: 'Billing street address Should be a string' })
            return
        };  
        
        if (!validator.isValidString(address.billing.city)){
            res.status(400).send({ status: false, message: 'Billing city address Should be a string' })
            return
        };  
        
        if (!validator.isValidString(address.billing.pincode)){
            res.status(400).send({ status: false, message: 'Billing pincode address Should be a string' })
            return
        };

        // Validation Ends

        let profileImage = await aws.uploadFile(files[0]);

        const salt = await bcrypt.genSalt(systemConfig.salt)

        const hashed = await bcrypt.hash(password, salt);

        // let hashed = hashing.hash(password);

        const userData = {
            fname,
            lname,
            email,
            phone,
            address,
            password: hashed,
            profileImage
        };

        const newUser = await userModel.create(userData)
        res.status(201).send({ status: true, message: 'User created successfully', data: newUser })   
    }catch(err){
        console.log(err)
        res.status(500).send({Status: false, Msg: err.msg})
    }
}

module.exports = {
    registerUser,
}