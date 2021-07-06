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

const userSchema = mongoose.Schema({
    fullname: isString,
    email: requiredUniqueString,
    password: requiredString,
    phone_no: isString,
    address: isString,
    image: isString,
    user_role: String
    
})

module.exports = mongoose.model('User', userSchema)