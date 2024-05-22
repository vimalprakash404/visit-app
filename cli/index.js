const  {Command} =  require('commander') ; 
const program = new Command() ;

// importing the controller 


const {createSuperUser} = require("../src/controllers/authenticate")
const {createDistrict , getAllDistrict} = require("../src/controllers/district")

const {createInstitutions , getAllInstitutions} = require("../src/controllers/institution")

require("../src/database/connection")
program 
    .version("0.1.0")
    .description("A simple cli app") 


program 
    .command("create <userType> <username> <password>")
    .action(async (UserType , username , password)=> {
        console.log("User type is" + UserType + username + password ) ; 
        console.log(await createSuperUser(username , password))
    })


program 
    .command("district")
    .command("create <name>")
    .action(async (name) => {
        const response =await createDistrict({name}) ;
        console.log(response);
    })
    
program
    .command("get d" )
    .action(async()=>{
        console.log("Data is Here" + JSON.stringify(await getAllDistrict()))
    })

program
    .command("createI <district> <name>") 
    .action(async(district , name) => {
       console.log(await createInstitutions({district ,name}));
    })

program.parse(process.argv); 