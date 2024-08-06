const express = require("express")
const app = express()
require('dotenv').config()
const { getProducer } = require("./producer")

app.get("/", async (req , res) =>{
    try{
        const producer = await getProducer()
        const topic = "test-topic"
        await producer.send({ topic , messages: [
            { key: 'key1', value: 'hello world', partition: 0 },
            { key: 'key1', value: 'hey hey!', partition: 1 },
            { key: 'key1', value: 'hey hey!2', partition: 1 },
            { key: 'key2', value: 'hey hey!3', partition: 2 },
            { key: 'key2', value: 'hey hey!4', partition: 2 },
            { key: 'key1', value: 'hello world2', partition: 0 },
          ], })
        return res.status(200).json({ message : "API run successfully"})
    }
    catch(error){
        return res.status(500).json({ status : 500 , message : error?.message || "Something went wrong"})
    }
    
})

const port = process.env.PORT
app.listen(port, () =>{
    console.log(`Server has started on port : ${port} `)
})