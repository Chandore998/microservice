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


// One queue one exchange with direct approach

const { directConnectRabbitMQ  } = require('./consume.js');

// directConnectRabbitMQ("myQueue2").catch(err =>{
//   console.error('Failed to connect to RabbitMQ:', err.message);
//   process.exit(1);
// })


// two queue one exchanges with direct approach
directConnectRabbitMQ(["myQueue2", "myQueue3"]).catch(err =>{
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
})

let numer = undefined
let st = Number(numer)
let st2 = Number(false)
console.log(st2)

console.log(Number(undefined))  // string only support this type 

console.log()


console.groupEnd("log variable")