const { Kafka , logLevel } = require('kafkajs')
require('dotenv').config()
let consumerInstance = null

async function initializationKafkaInstance(){
    try{
        const kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER_HOST],
            connectionTimeout: 3000,
            logLevel: logLevel.ERROR
        })
        kafka.logger().setLogLevel(logLevel.WARN)

        let consumer = kafka.consumer({ groupId: 'test-group' })
        await consumer.connect()
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
        consumerInstance = consumer; 
        await getReceiveMessage()

    }
    catch(err){
        console.error('Error initializing Kafka producer:', err);

        if (consumerInstance) {
            try {
                await consumerInstance.disconnect();
            } catch (disconnectErr) {
                console.error('Error disconnecting Kafka producer:', disconnectErr);
            }
        }
        consumerInstance = null; 
        throw err; 
    }
}

async function getReceiveMessage(){
    await consumerInstance.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(message.value.toString(),partition,topic)
        },
      })
}

async function getConsumer() {
    if (!consumerInstance) {
        await initializationKafkaInstance();
    }
    return consumerInstance;
}

module.exports = {
    getConsumer
}
