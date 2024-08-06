const { Kafka , logLevel } = require('kafkajs')
let consumer = null

async function initKafka(){
    try{
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['54.66.144.229:9092'],
            // connectionTimeout: 3000,
            logLevel: logLevel.ERROR
        })
        consumer = kafka.consumer({ groupId: 'test-group' })
        await consumer.connect()
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await getReceiveMessage()
    }
    catch(err){
        if(consumer){
            await consumer.disconnect()
        }
    }
}

async function getReceiveMessage(){
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(message)
        },
      })
}

(async () => {
    await initKafka()
    console.log("hi")
})()

module.exports = {
    initKafka
}
