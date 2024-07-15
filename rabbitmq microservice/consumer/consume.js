const amqp = require("amqplib")
let channel , connection

async function receiveMessage(){
    console.log("Receive message for producer")
    const queue = "myQueue"
    try{        
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, 
        {
            noAck: true
        });
    }
    catch(err){
        console.log('Error sending message to RabbitMQ:', err);
        throw err
    }
}

async function connectRabbitMQ(queue){
    try{
        connection  = await amqp.connect('amqp://localhost');
        channel  = await connection.createChannel();
        if(channel){
            channel.assertQueue(queue , { durable: false })
            receiveMessage()
        }
    }
    catch(err){
        if(connection || channel){
            await closeConnection(connection , channel)
        }
        console.warn(err);
    }
}

async function closeConnection(connection , channel){
    if(channel){
        channel.close()
    }
    if(connection){
        connection.close()
    }
}

module.exports = { connectRabbitMQ , receiveMessage}