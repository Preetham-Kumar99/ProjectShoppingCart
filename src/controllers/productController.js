const multer = require('multer')

const { validator, aws, jwt } = require('../utils')

const { systemConfig } = require('../configs')

const { productModel } = require('../models');


const registerProduct = async function (req, res) {
    try {
        const requestBody = req.body.json;

        const files = req.files

        if (!validator.isValid(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request , Body is required' })
            return
        }

        if (!validator.isValidRequestBody(JSON.parse(requestBody))) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide User details' })
            return
        };

        let { title, description, price, currencyId, currencyFormat, isFreeShipping, style, availableSizes, installments } = JSON.parse(requestBody.trim());

        // Validation Starts

        if (!validator.isValid(title)) {
            res.status(400).send({ status: false, message: 'Title is Required' })
            return
        };

        if (!validator.isValid(description)) {
            res.status(400).send({ status: false, message: 'Description is Required' })
            return
        };

        if (!validator.isValid(price)) {
            res.status(400).send({ status: false, message: 'Price is Required' })
            return
        };

        if (!validator.isValid(availableSizes)) {
            res.status(400).send({ status: false, message: 'availableSizes is Required' })
            return
        };

        if (!validator.isValid(files[0])) {
            res.status(400).send({ status: false, message: 'Product Image is required' })
            return
        }

        // validation Ends

        // Parameter type Check

        if (!validator.isValidString(title)) {
            res.status(400).send({ status: false, message: 'title Should be a string' })
            return
        };

        if (!validator.isValidString(description)) {
            res.status(400).send({ status: false, message: 'description Should be a string' })
            return
        };

        if (!validator.isValidNumber(price)) {
            res.status(400).send({ status: false, message: 'price Should be a number' })
            return
        };

        if (!validator.isValidString(currencyId)) {
            res.status(400).send({ status: false, message: 'currencyId Should be a String' })
            return
        };

        let isTitleAlreadyInUse = await productModel.findOne({ title })

        if (isTitleAlreadyInUse) {
            res.status(400).send({ Status: false, msg: "title Already exists" })
            return
        };

        if (!validator.isValidString(currencyFormat)) {
            res.status(400).send({ status: false, message: 'currencyFormat Should be a string' })
            return
        };

        if (!validator.isValidBoolean(isFreeShipping)) {
            res.status(400).send({ status: false, message: 'isFreeShipping Should be a boolean' })
            return
        };

        if (!validator.isValidString(style)) {
            res.status(400).send({ status: false, message: 'style Should be a string' })
            return
        };

        if (!validator.isArray(availableSizes)) {
            res.status(400).send({ status: false, message: 'AvailableSizes Should be a array' })
            return
        };

        if (!validator.isValidSize(availableSizes)) {
            res.status(400).send({ status: false, message: `AvailableSizes Should be among ${systemConfig.sizeEnumArray.join(', ')}` })
            return
        };

        if (!validator.isValidNumber(installments)) {
            res.status(400).send({ status: false, message: 'installments Should be a number' })
            return
        };

        // Validation Ends

        let productImage = await aws.uploadFile(files[0]);

        const productData = {
            title,
            description,
            price,
            currencyId,
            currencyFormat,
            isFreeShipping,
            productImage,
            style,
            availableSizes,
            installments
        };

        const newProduct = await productModel.create(productData)
        res.status(201).send({ status: true, message: 'Product added successfully', data: newProduct })
    } catch (err) {
        console.log(err)
        res.status(500).send({ Status: false, Msg: err.message })
    }
}

module.exports = {
    registerProduct,
    // loginUser,
    // getUser,
    // updateUser,
}