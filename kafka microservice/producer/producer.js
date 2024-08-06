const { Kafka , Partitioners,logLevel } = require('kafkajs')
require('dotenv').config()

let producerInstance = null
async function initializationKafkaInstance(){
    if(producerInstance) return producerInstance
    try{

        const kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER_HOST],
            connectionTimeout: 3000,
            logLevel: logLevel.ERROR
        })
        kafka.logger().setLogLevel(logLevel.WARN)
        const producers = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
        await producers.connect()
        producerInstance = producers; 
        return producerInstance;

    }
    catch(err){
        console.error('Error initializing Kafka producer:', err);

        if (producerInstance) {
            try {
                await producerInstance.disconnect();
            } catch (disconnectErr) {
                console.error('Error disconnecting Kafka producer:', disconnectErr);
            }
        }
        producerInstance = null; 
        throw err; 
    }
}

async function getProducer() {
    if (!producerInstance) {
        await initializationKafkaInstance();
    }
    console.log(producerInstance)
    return producerInstance;
}


module.exports = {
    getProducer
}
