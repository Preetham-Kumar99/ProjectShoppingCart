const mongoose = require('mongoose')

const reemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const remobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

const validateEmail = function(email) {
    return reemail.test(email)
};

const validatePhone = function(mobile) {
    return remobile.test(mobile)
}

const PasswordLength = function(password) {
    if(password.length >= 8 && password.length <= 15) return true
    return false;
}

const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidString = function(value) {
    return Object.prototype.toString.call(value) === "[object String]"
}

const isArray = function(arr) {
    return Array.isArray(arr)
}

module.exports = {
    validateEmail,
    emailRegex: reemail,
    phoneRegex: remobile,
    isValid,
    isValidRequestBody,
    isValidObjectId,
    isValidString,
    isArray,
    validatePhone,
    PasswordLength
};