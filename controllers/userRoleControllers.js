const userRole = require('../model/userRole')
const User =  require('../model/userModel')
const jwt = require('jsonwebtoken')
const userRoleSchema = require('../model/userRole')
const userSchema = require('../model/userModel')

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
    
        res.status(500).json({ message: 'Something went wrong'})
    }

    
}

const roleUpdateUserTable = async (req,res) => {
    //fullname,email,pass,confpass
    const {email} = req.body

    try {
        
        const existingUserRole = await userRole.findOne({email})
        const existingUser = await User.findOne({email})
      
        if(existingUser && existingUserRole){
            await userSchema.updateOne(
                {
                    email: existingUser.email,
                },
                {
                    user_role:existingUserRole.user_role,
                }
            )
        return res.json({'message':`User role updated from ${existingUser.user_role} to ${existingUserRole.user_role}`})
        }else{
            return res.status(400).json({ message: "User or user role not exist"})
        }
        
        
        
    } catch (error) {
       console.log(error)
        res.status(500).json({ message: 'Something went wrong'})
    }

    
}

const roleUpdateRoleTable = async (req,res) => {
  
    const {email,role} = req.body
   
    try {
        
        const existingUserRole = await userRole.findOne({email})
        const existingUser = await User.findOne({email})
        if(existingUserRole){
            await userRoleSchema.updateOne(
                {
                    email: existingUserRole.email,
                },
                {
                    user_role:role,
                }
            )
            await userSchema.updateOne(
                {
                    email: existingUser.email,
                },
                {
                    user_role:role,
                }
            )
        return res.json({'message':`User role updated from ${existingUserRole.user_role} to ${role}`})
        }else{
            return res.status(400).json({ message: "User role not exist"})
        }
        
        
        
    } catch (error) {
      
        res.status(500).json({ message: 'Something went wrong'})
    }

    
}

module.exports = {test,viewAllRole,roleRegister, roleUpdateUserTable,roleUpdateRoleTable}