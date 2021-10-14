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

const replyComment = {
    'id': Number,
    'userId': String,
    'comments': String,
    'isVisible': Boolean,
    timestamp: {
        type: Date,
        default: new Date(),
    }
}

const comment = {
    'id': Number,
    'userId': String,
    'comments': String,
    'isVisible': Boolean,
    'replyComment': [replyComment],
    timestamp: {
        type: Date,
        default: new Date(),
    }
}

const questionAnswer = {
    'id': Number,
    'questionUserId': String,
    'question': String,
    'answer': String,
    'isVisible': Boolean,
    'priorityIndex': Number,
    timestamp: {
        type: Date,
        default: new Date(),
    }
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
    unitName: requiredString,
    unitPrize: requiredNumber,
    bookingPercentage: isNumber,
    available: requiredNumber,
    minOrder: isNumberDefaultZero,
    rating: isNumber,
    availableDate: requiredDate,
    expireDate : isDate,
    division: requiredString,
    district: requiredString,
    upazilla: isString,
    isVerified: requiredBoolean,
    isAvailableNow: requiredBoolean,
    comments: {
        type: [comment],
        default: [],
    },
    questionAns: {
        type: [questionAnswer],
        default: [],
    },
    timestamp: {
        type: Date,
        default: new Date(),
    }

    
})

module.exports = mongoose.model('product', productSchema)