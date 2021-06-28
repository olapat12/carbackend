const http = require('http')
const express = require('express')
const app = express();
const cors = require('cors')
const port = 128;
const WebSocket = require('ws')
const server = http.createServer(express)
const wss = new WebSocket.Server({server})
const dotenv = require('dotenv')
const Car = require('./car')
const mongoose = require('mongoose')

let carData;
dotenv.config();
app.use(cors())
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    ()=> console.log('connected to db'));

//  const saving = function(){
//     app.post('/car', async (res, req)=>{

//         try {
//             const savedData = await Car.save(carData)
//             console.log(savedData)
            
//         } catch (error) {
//             res.status(400).send(error)
//             console.log(error)
//         }
//     })
//  } 

wss.on('connection', (ws)=>{

    ws.on('message', async function incoming(data){
        var objectt = JSON.parse(data);
        
      const cardata = new Car({
          fuelLevel: objectt.fuelLevel,
          speed: objectt.speed
      })
      try {
        const savedData = await cardata.save()
       // console.log(savedData)
        
    } catch (error) {
        console.log(error)
    }
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data)
                console.log(JSON.parse(data))
            }
        })
    })
});



server.listen(port, ()=> console.log('running fast'))