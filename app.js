const express = require('express')
const app = express()
const authRoutes = require('./routers/authRoutes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()


const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//hello 
app.get('/',(req,res)=> {
    res.send(`Hello from kishan backend`)
})

app.use('/auth',authRoutes)



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Mongodb connected and Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = app