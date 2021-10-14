
const questionAnswer = {
    'id': Number,
    'questionUserId': String,
    'question': String,
    'answer': String,
    'isVisible': Boolean,
    'priorityIndex': Number,
    timestamp: {
        type: Date,
        default: Date.now,
    }
}


const productQuestionSchema = mongoose.Schema({
    productId: String,
    questionAns: {
        type: [questionAnswer],
        default: [],
    }

    
})

module.exports = mongoose.model('productQuestionSchema', productQuestionSchema)
