const express = require("express")
const app = express()
const { connectRabbitMQ , receiveMessage } = require('./consume.js');

connectRabbitMQ("myQueue").catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})


