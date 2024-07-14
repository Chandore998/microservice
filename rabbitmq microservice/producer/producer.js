const amqp = require("amqplib")

async function producerMessage(queue , payload){
    try{
        const { channel , connection } = await connectRabbitMQ()
        channel.assertQueue(queue , { durable: false })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
        await closeConnection(connection,channel)
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
    setTimeout(function() {
        if(channel){
            channel.close()
        }
        if(connection){
            connection.close()
        }
        process.exit(0)
        }, 5000);
}

module.exports = { connectRabbitMQ , producerMessage }