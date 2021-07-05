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

const notificationSchema = mongoose.Schema({
    user_id: isString,
    user_role: isString,
    message: isString,
    type: isString,
    timestamp: isString,
    
})

module.exports = mongoose.model('notification',notificationSchema)