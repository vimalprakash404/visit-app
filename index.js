const express = require("express");
const app = express();
const router = require("./src/routes/index")


app.use(express.json())
app.use("/api", router )

app.get('/' , (req , res )=>{
    res.send("Hello world I am here")
})

const PORT = process.env.PORT || 3000 ;
 

app.listen(PORT , ()=>{
    console.log(`Server is Running on ${PORT}`)
})