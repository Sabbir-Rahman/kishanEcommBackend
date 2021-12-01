const express = require('express')
const app = express()
const authRoutes = require('./routers/authRoutes')
const roleRoutes = require('./routers/roleRoutes')
const productUploadRoutes = require('./routers/productRoutes')
const notificationRoutes = require('./routers/notificationRoutes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
var cors = require('cors')
dotenv.config();

app.use(cors()) 

const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL
app.listen(PORT,()=> {
  console.log(`Server running on ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/',(req,res)=> {
    res.send(`Hello from kishan backend`)
})


app.use('/auth',authRoutes)
app.use('/role',roleRoutes)
app.use('/product',productUploadRoutes)
app.use('/notification',notificationRoutes)

//comment
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