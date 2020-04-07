let RainbowSDK = require("rainbow-node-sdk");

const express = require('express')
const app = express()
const port = 3000



function createOptions(){

    let newopt = {
        rainbow: {
            host: "sandbox"
        },
        credentials: {
            login: "codmtl19@gmail.com",//"rahul_parthasarathy@mymail.sutd.edu.sg", // To replace by your developer credendials
            password: 'cH{Kg=OzVy"9'//"rBNcm06IMy/0" // To replace by your developer credentials
        },
        // Application identifier
        application: {
            /*
            appID: "a08bef9055ad11eabb3887f44e39165a",
            appSecret: "MY6oXMVM51aMUwIpTQz5DB6L0lXBcNe5VQeqKtws2NpSbCxc5sPv5pMUTiImNjjq"*/
            "appID": "7c9015906de411eaa8fbfb2c1e16e226",
            "appSecret": "c9JRxoP3dwnBF4R0siuK5LCqHnbQrnLHxl0HU6L9jyi2RGJbjHjaOuQhoPmRH7QJ"
        },
        // Logs options
        logs: {
            enableConsoleLogs: false,
            enableFileLogs: false,
            "color": true,
            "level": 'debug',
            "customLabel": "Rahulnod",
            "system-dev": {
                "internals": false,
                "http": false,
            }, 
            file: {
                path: "/var/tmp/rainbowsdk/",
                customFileName: "R-SDK-Node-Sample2",
                level: "debug",
                zippedArchive : false/*,
                maxSize : '10m',
                maxFiles : 10 // */
            }
        },
        // IM options
        im: {
            sendReadReceipt: true
        }
    };
    return newopt;
}
var options = createOptions();

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);
// Start the SDK
let userEmailAccount = "agentttefst@gmail.com";
let userPassword = "Agent2password!";
let userFirstname = "Agent2copy";
let userLastname = "002";
let jid ;
app.get('/signup', (req, res)=> {
  
    userFirstname = req.query['fname'];
    userLastname = req.query['lname'];
    userEmailAccount = req.query['email'];
    userPassword = req.query['password'];
    console.log(userLastname);
    console.log(userFirstname);
    console.log(userPassword);
    console.log(userEmailAccount);
    
    rainbowSDK.start();
    //userLastname = "ssss";
    setTimeout(function(){
        console.log("calling this");
        res.send("save this jid: " + jid);

    } , 50000);
  

    
}

);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



rainbowSDK.events.on("rainbow_onready", () => {

console.log("before");

let prom= rainbowSDK.admin.createUserInCompany(userEmailAccount, userPassword, userFirstname, userLastname,"5e4d7408b4528b74a00c90bb").then((user) => {
    jid = user.jid_im;
    rainbowSDK.invitations.sendInvitationByEmail(userEmailAccount).then((obj)=>{console.log("yes invite sent")}).catch((ee)=>{console.log(ee)});
    rainbowSDK.im.sendMessageToJid("Hi Welcome to Rainbow! Our agent will be with you shortly!" , jid);
    
    console.log("suppp");
   
   
console.log("addwed");

rainbowSDK.stop();
// Do something when the user has been created and added to that company

}).catch((err) => {

// Do something in case of error
console.log(err);
rainbowSDK.stop();
}); 
    // Get your network's list of contacts
    
   
    
    
    
});