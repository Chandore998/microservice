const { producerMessage }  = require('../producer')

exports.sendNotification = async function(req,res) {
    try {
        producerMessage("myQueue" , req.body)
        res.status(200).json({ message : "Notification send to consumer"})
      } 
      catch (error) {
        console.error('Error sending message to RabbitMQ:', error.message);
        res.status(500).json({ error: 'Error sending message to RabbitMQ' });        
      }
}