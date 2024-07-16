// const { producerMessage }  = require('../producer')
const { directProducerMessage }  = require('../producer')

exports.sendNotification = async function(req,res) {
    try {

      // const result = await producerMessage("myQueue1" , req.body)

       //  Direct Exchange Approach
        const exchange = 'direct_hello_world';
        // const queue = `myQueue2_routing_key`
        const queue = `myQueue3_routing_key`
        await directProducerMessage(exchange, queue, req.body)
        
        res.status(200).json({ message : "Notification send to consumer"})
      } 
      catch (error) {
        console.error('Error sending message to RabbitMQ:', error.message);
        res.status(500).json({ error: 'Error sending message to RabbitMQ' });        
      }
}