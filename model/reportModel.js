const mongoose  =  require('mongoose')

//this is for replicating required
const requiredString = {
    type: String,
    required: true
}

const isString = {
    type: String,
    
}

const requiredUniqueString = {
    type: String,
    required: true,
    unique: true
}

const reportSchema = mongoose.Schema({
    userId: requiredString,
    details: isString    
})

module.exports = mongoose.model('report', reportSchema)