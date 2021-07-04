const User =  require('../model/userModel')
const jwt = require('jsonwebtoken')
const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const test = ((req,res) => {
    res.send('Hello this is from auth')
})

const databaseTest = async (req,res)=>{
    const {fullname,email,password} = req.body
    

    //new user object
    const newUser = {
        fullname:fullname,
        email: email,
        password: password
    }

    try{
        await new userSchema(newUser).save()
        res.status(201).json(newUser).redirect('/')
    } catch (error){
        res.status(409).json({message: error.message})
    }

}

const postRegister = async (req,res) => {
    //fullname,email,pass,confpass
    const {fullname,email,password,confpassword} = req.body

    try {
        
        const existingUser = await User.findOne({email})
        
        if(existingUser) return res.status(400).json({ message: "User already exist"})

        if(password !== confpassword){
            return res.status(400).json({ message: "Password don't match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = {fullname:fullname, email:email,password:hashedPassword}

        const result =  await new userSchema(newUser).save()
       
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h"})
          
        res.status(201).json({ result, token})
        
        
    } catch (error) {
       console.log(error)
        res.status(500).json({ message: 'Something went wrong'})
    }

    
}

module.exports = {test, databaseTest, postRegister}