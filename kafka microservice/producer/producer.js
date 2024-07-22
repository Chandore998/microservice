const { Kafka , Partitioners } = require('kafkajs')
let producer = null

async function initKafka(){
    try{
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['kafka1:9092'],
        })
        producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
        await producer.connect()
    }
    catch(err){
        console.log(err)
        if(producer){
            await producer.disconnect()
        }
    }
}

(async () => {
    await initKafka()
})()

module.exports = {
    initKafka
}
