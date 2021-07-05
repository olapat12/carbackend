
const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 128;
const dotenv = require('dotenv')
const Car = require('./car')
const mongoose = require('mongoose')

dotenv.config();
app.use(cors())
mongoose.connect('mongodb+srv://olajide:tech10@cluster0.4x6cv.mongodb.net/catholic?retryWrites=true&w=majority', 
    { useNewUrlParser: true },
    ()=> console.log('connected to db'));


    app.get('/all', async(req, res)=>{

        try {
          const all = await Car.find();
          res.status(200).send(all)
        } catch (error) {
          console.log(error)
        }
      });

      app.get('/', async(req, res)=>{
          res.send('hello world')
      })


app.listen(port, ()=> console.log('running fast'))