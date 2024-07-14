const express = require("express")
const app = express()
const { connectRabbitMQ } = require('./producer.js');

connectRabbitMQ().catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})


app.use(express.json({limit:'50mb'}));

// Example route to send a message to RabbitMQ
const testRoutes = require('./routes/index')
app.use('/', testRoutes)

app.get("/", (req , res) =>{
    res.status(200).json({ message : "API run successfully"})
})


const port = 3000
app.listen(port, () =>{
    console.log(`Server has started on port : ${port} `)
})