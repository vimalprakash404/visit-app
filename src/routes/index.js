const express = require("express")
const router  = express.Router(); 
// connecting to the database  
require("../database/connection")
// importing routers
const authenticate = require("./authenticate")

//import debug router
const debug  = require("./debug");

router.use("/debug", debug)

router.use("/authenticate", authenticate) ; 
 

module.exports = router ; 