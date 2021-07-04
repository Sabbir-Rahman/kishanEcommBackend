const mongoose  =  require('mongoose')

//this is for replicating required
const requiredString = {
    type: String,
    required: true
}

const requiredUniqueString = {
    type: String,
    required: true,
    unique: true
}

const userSchema = mongoose.Schema({
    fullname: requiredString,
    email: requiredUniqueString,
    password: requiredString
    
})

module.exports = mongoose.model('User', userSchema)