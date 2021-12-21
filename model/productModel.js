const mongoose  =  require('mongoose')

//this is for replicating required
const requiredString = {
    type: String,
    required: true
}

const requiredDate = {
    type: Date,
    required: true
}

const isDate = {
    type: Date,
    
}

const isString = {
    type: String
    
}

const isNumber = {
    type: Number
    
}

const isNumberDefaultZero = {
    type: Number,
    default:0
    
}

const maxOrder = {
    type: Number,
    default:999999
    
}
const requiredNumber = {
    type: Number,
    required: true
    
}

const requiredUniqueString = {
    type: String,
    required: true,
    unique: true
}

const requiredBoolean = {
    type: Boolean,
    required: true
}

const reVerificationNeed = {
    status: {
        type: Boolean,
        default: false
    },
    message: String 
}





const productSchema = mongoose.Schema({
    seller_id: requiredString,
    name: requiredString,
    description: requiredString,
    category:isString,
    subCategory:isString,
    image:isString,
    image2:isString,
    image3:isString,
    video: isString,
    reVerificationMessage: String ,
    unitName: requiredString,
    unitPrize: requiredNumber,
    bookingPercentage: isNumber,
    available: requiredNumber,
    minOrder: isNumberDefaultZero,
    maxOrder: maxOrder,
    rating: isNumber,
    ratingCount: isNumberDefaultZero,
    availableDate: requiredDate,
    expireDate : isDate,
    division: requiredString,
    district: requiredString,
    upazilla: isString,
    isVerified: requiredBoolean,
    isAvailableNow: requiredBoolean,
    timestamp: {
        type: Date,
        default: Date.now
    }

    
})

module.exports = mongoose.model('product', productSchema)