const express = require("express")
const app = express()

const { initKafka } = require("./consumer.js")
initKafka()



