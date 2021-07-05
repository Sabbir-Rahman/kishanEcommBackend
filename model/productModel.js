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
    description: requiredString,
    unitName: requiredString,
    unitPrize: requiredNumber,
    available: requiredNumber,
    minOrder: isNumber,
    rating: isNumber,
    availableDate: requiredDate,
    division: requiredString,
    district: requiredString,
    upazilla: isString,
    isVerified: requiredBoolean,
    isAvailableNow: requiredBoolean,
    timestamp:isString

    
})

module.exports = mongoose.model('product', productSchema)