const amqp = require("amqplib")


async function receiveMessage(){
    console.log("Receive message for producer")
    const queue = "myQueue"
    try{
        const { channel , connection } = await connectRabbitMQ()
        channel.assertQueue(queue , { durable: false })
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, 
        {
            noAck: true
        });
        
        // closeConnection(connection , channel)
    }
    catch(err){
        console.log('Error sending message to RabbitMQ:', err);
        throw err
    }
}

async function connectRabbitMQ(){
    try{
        const connection  = await amqp.connect('amqp://localhost');
        const channel  = await connection.createChannel();
        return {channel , connection }
    }
    catch(err){
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