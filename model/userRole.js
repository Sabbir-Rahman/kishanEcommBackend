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

const userRoleSchema = mongoose.Schema({
    email: requiredUniqueString,
    user_role: requiredString
    
})

module.exports = mongoose.model('userRole', userRoleSchema)