
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
    'id': Number,
    'userId': String,
    'comments': String,
    'isVisible': Boolean,
    'replyComment': [replyComment],
    timestamp: {
        type: Date,
        default: Date.now,
    }
}

const commentSchema = mongoose.Schema({
    productId: String,
    comments: {
        type: [comment],
        default: [],
    }

    
})

module.exports = mongoose.model('productComment', commentSchema)
