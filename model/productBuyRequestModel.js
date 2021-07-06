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



const productBuyRequestSchema = mongoose.Schema({
    product_id: requiredString,
    productName: isString,
    buyer_id: requiredString,
    buyerName: isString,
    buyerAddress: isString,
    buyerPhone: isString,
    buyerEmail: isString,
    buyingQuantityUnit: requiredString,
    buyingQuantity: requiredNumber,
    buyingMoney: requiredNumber.required,
    bookingMoney: requiredNumber,
    status : requiredString,
    timestamp: {
        type: Date,
        default: new Date(),
    }

    
})

module.exports = mongoose.model('productBuyRequest', productBuyRequestSchema)