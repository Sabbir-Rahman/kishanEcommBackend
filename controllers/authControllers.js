const userSchema = require('../model/userModel')

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
        res.status(201).json({message:'Database checked', data:newUser}).redirect('/')
    } catch (error){
        res.status(409).json({message: error.message})
    }

}

module.exports = {test, databaseTest}