const express = require('express')
const app = express()

const port = 5000
//hello 
app.get('/',(req,res)=> {
    res.send('Hello from kishan backend')
})

module.exports = app

app.listen(port, () => console.log(`Server running on ${port}`))