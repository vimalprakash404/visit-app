const express = require('express')
const router = express.Router();
const {debug} = require("../../controllers/debug")


router.get("/sam" , debug);
module.exports = router ;