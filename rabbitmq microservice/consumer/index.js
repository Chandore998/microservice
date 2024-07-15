const express = require("express")
const app = express()

/*

const { connectRabbitMQ , receiveMessage } = require('./consume.js');

// Single queue approach

connectRabbitMQ("myQueue").catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})

// Multiple queues approach

connectRabbitMQ(["myQueue","myQueue1"]).catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})

*/


const { directConnectRabbitMQ  } = require('./consume.js');

directConnectRabbitMQ("myQueue2").catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})
