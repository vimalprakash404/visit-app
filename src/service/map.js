require("dotenv").config({})
const axios =  require("axios"); 

const  MAP_API = process.env.MAP_API ;

console.log("map  api : "+MAP_API)
async function  getResult({institutionName , place , district  , state  , pinCode , country   }){
    const res =  await axios.get(`https://api.geoapify.com/v1/geocode/search?text= ${institutionName} , ${place} , ${district} , ${state} , ${pinCode} , ${country} &apiKey=${MAP_API}`);    
    return res.data ;
}


module.exports = {getResult} ;