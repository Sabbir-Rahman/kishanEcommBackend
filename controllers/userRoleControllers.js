const userRole = require('../model/userRole')
const jwt = require('jsonwebtoken')
const userRoleSchema = require('../model/userRole')

const dotenv = require('dotenv')
dotenv.config()
const test = ((req,res) => {
    res.send('Hello this is from auth')
})

const viewAllRole = async(req,res) => {
    const allUserRole = await userRole.find()
    res.json(allUserRole).status(200)
}


const roleRegister = async (req,res) => {
    //fullname,email,pass,confpass
    const {email,role} = req.body

    try {
        
        const existingUser = await userRole.findOne({email})
        
        if(existingUser) return res.status(400).json({ message: "User already exist"})
        const newUserRole = {email:email,user_role:role}

        const result =  await new userRoleSchema(newUserRole).save()
          
        res.status(201).json(result)
        
        
    } catch (error) {
       console.log(error)
        res.status(500).json({ message: 'Something went wrong'})
    }

    
}

module.exports = {test,viewAllRole,roleRegister}