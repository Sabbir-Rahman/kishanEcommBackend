const mongoose  =  require('mongoose')

const requiredUniqueString = {
    type: String,
    required: true,
    unique: true
}

const replyComment = {
    'id': Number,
    'userId': String,
    'comments': String,
    'isVisible': Boolean,
    timestamp: {
        type: Date,
        default: Date.now,
    }
}

const comment = {
    'userId': String,
    'comments': String,
    'isVisible': Boolean,
    'replyComment': {
        type: [replyComment],
        default: [],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
}

const commentSchema = mongoose.Schema({
    productId: requiredUniqueString,
    comments: {
        type: [comment],
        default: [],
    }

    
})

module.exports = mongoose.model('productComment', commentSchema)
