const express = require("express")
const app = express()
require('dotenv').config()

const { getConsumer } = require("./consumer.js")
getConsumer()



