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
            // default partitioner which is two partition
        // const producers = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner  })
        
        const MyPartitioner = () => {
            return ({ topic, partitionMetadata, message }) => {
              // Example logic: use a hash of the key to determine the partition
              const key = message.key;
              const partitionCount = partitionMetadata.length;
              const hash = key ? key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
              return hash % partitionCount;
            };
        };
        const producers = kafka.producer({ createPartitioner: MyPartitioner  })
       
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
    return producerInstance;
}


module.exports = {
    getProducer
}
