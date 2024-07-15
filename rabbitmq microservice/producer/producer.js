const amqp = require("amqplib")
let channel , connection 

/*

        DEFAULT APPROCH 

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
*/


async function directProducerMessage(exchange, queueKey , payload){
    try{       
        return channel.publish(exchange, queueKey , Buffer.from(JSON.stringify(payload)));
    }
    catch(err){
        console.log('Error sending message to RabbitMQ:', err);
        throw err
    }
}

async function directConnectRabbitMQ(queue){
    try{
        connection  = await amqp.connect('amqp://localhost');
        channel  = await connection.createChannel();
        if(channel){
            const exchange = 'direct_hello_world';
          
            // create Exchange ve queue
            await channel.assertExchange(exchange, 'direct', { durable: false });
            await channel.assertQueue(queue);
          
            // Connect queue to exchange
            await channel.bindQueue(queue, exchange, `${queue}_routing_key`);
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

// module.exports = { connectRabbitMQ , producerMessage }
module.exports = { directConnectRabbitMQ , directProducerMessage }