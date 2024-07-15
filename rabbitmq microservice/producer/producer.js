const amqp = require("amqplib")
let channel , connection 

async function producerMessage(queue , payload){
    try{       
       return channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
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
        }
    }
    catch(err){
        if(connection || channel){
            await closeConnection(connection,channel)
        }
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