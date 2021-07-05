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

const requiredDecimal = {
    type: Decimal128,
    required: true
}

const isDecimal = {
    type: Decimal128
}
const isString = {
    type: String
    
}

const isNumber = {
    type: Number
    
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



const productSchema = mongoose.Schema({
    seller_id: requiredString,
    name: requiredString,
    description: requiredUniqueString,
    unitName: requiredString,
    unitPrize: requiredDecimal,
    available: requiredNumber,
    minOrder: isNumber,
    rating: isDecimal,
    avaialableDate: requiredDate,
    division: requiredString,
    district: requiredString,
    upazilla: isString,
    isVerified: requiredBoolean,
    isAvaiable: requiredBoolean

    
})

module.exports = mongoose.model('product', productSchema)