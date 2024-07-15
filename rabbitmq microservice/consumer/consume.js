const amqp = require("amqplib")
let channel , connection

/*

          Default approch 
async function receiveMessage(queue){
    console.log(`Receive message for producer : ${queue}` )
    try{        
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s %s", msg.content.toString() , queue);
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

// This is AMPQ Default Connection
async function connectRabbitMQ(queues){
    try{
        connection  = await amqp.connect('amqp://localhost');
        channel  = await connection.createChannel();
        if(channel){
           
            // Single queue approach
            // channel.assertQueue(queue , { durable: false })
            // receiveMessage(queue)
            
            // Multiple queue approach
            for(let queue of queues){
                channel.assertQueue(queue ,{ durable: false })
                receiveMessage(queue)
            }

        }
    }
    catch(err){
        if(connection || channel){
            await closeConnection(connection , channel)
        }
        console.warn(err);
    }
}

*/



async function directReceiveMessage(queue){
    console.log(`Receive message for producer : ${queue}` )
    try{        
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s %s", msg.content.toString() , queue);
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

// This is amq.direct Direct Connection
async function directConnectRabbitMQ(queue){
    try{
        connection  = await amqp.connect('amqp://localhost');
        channel  = await connection.createChannel();
        if(channel){
            // RoutingKey & Exchange 

            const exchange = 'direct_hello_world';

            // create Exchange ve queue
            await channel.assertExchange(exchange , "direct" , { durable : false } )
            await channel.assertQueue(queue);

            // Connect queue to exchange
            await channel.bindQueue(queue, exchange, `${queue}_routing_key`);

            // Receiver message function
            directReceiveMessage(queue)
            
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

// module.exports = { connectRabbitMQ , receiveMessage}
module.exports = { directConnectRabbitMQ }