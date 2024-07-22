const express = require("express")
const app = express()

require("./producer")

app.get("/", (req , res) =>{
    res.status(200).json({ message : "API run successfully"})
})

const port = 3000
app.listen(port, () =>{
    console.log(`Server has started on port : ${port} `)
})