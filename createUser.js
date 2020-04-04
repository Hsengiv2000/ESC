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
            login: "rahul_parthasarathy@mymail.sutd.edu.sg", // To replace by your developer credendials
            password: "rBNcm06IMy/0" // To replace by your developer credentials
        },
        // Application identifier
        application: {
            appID: "a08bef9055ad11eabb3887f44e39165a",
            appSecret: "MY6oXMVM51aMUwIpTQz5DB6L0lXBcNe5VQeqKtws2NpSbCxc5sPv5pMUTiImNjjq"
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
    
    res.send("Creating a user...... give it a minute");

    
}

);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



rainbowSDK.events.on("rainbow_onready", () => {

console.log("before");

let prom= rainbowSDK.admin.createUserInCompany(userEmailAccount, userPassword, userFirstname, userLastname,"5e517abab4528b74a00c92a8").then((user) => {
  
    
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