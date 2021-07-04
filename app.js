const express = require('express')
const app = express()
const authRoutes = require('./routers/authRoutes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()


const PORT = process.env.PORT || 5000
const CONNECTION_URL = 'mongodb+srv://ecomm:ecomm@cluster0.rfrs8.mongodb.net/kishanEcommDatbase?retryWrites=true&w=majority'
app.listen(PORT,()=> {
  console.log(`Server running on ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//hello 
app.get('/',(req,res)=> {
    res.send(`Hello from kishan backend`)
})

app.use('/auth',authRoutes)



const connectDB = async () => {
  try {
      await mongoose.connect(CONNECTION_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
      });

      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();

module.exports = app