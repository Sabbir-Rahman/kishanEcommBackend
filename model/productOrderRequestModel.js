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

const isNumberDeafultZero = {
    type: Number,
    default: 0
    
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



const productOrderRequestSchema = mongoose.Schema({
    product_id: requiredString,
    productName: isString,
    buyer_id: requiredString,
    seller_id: requiredString,
    buyingQuantityUnit: requiredString,
    buyingQuantity: requiredNumber,
    buyingMoney: requiredNumber,
    bookingMoney: requiredNumber,
    status : requiredString,
    rating : isNumberDeafultZero,
    timestamp: {
        type: Date,
        default: new Date(),
    }

    
})

module.exports = mongoose.model('productOrderRequest', productOrderRequestSchema)

