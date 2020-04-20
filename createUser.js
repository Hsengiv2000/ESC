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
/*
let userEmailAccount = "agentttefst@gmail.com";
let userPassword = "Agent2password!";
let userFirstname = "Agent2copy";//
let userLastname = "002"; */
//let jid ;
rainbowSDK.start();
app.get('/signup', (req, res)=> {
  
    userFirstname1 = req.query['fname'];
    userLastname1 = req.query['lname'];
    userEmailAccount1 = req.query['email'];
    userPassword1 = req.query['password'];
    console.log(userLastname1);
    console.log(userFirstname1);
    console.log(userPassword1);
    console.log(userEmailAccount1);
    jidd=create(userEmailAccount1, userPassword1, userFirstname1, userLastname1, function(jidc){res.send("Copy paste thisJID onto the previous page: " +jidc);});
    console.log("returned jid = " +jidd);//rainbowSDK.start();
    //userLastname = "ssss";
/*    setTimeout(function(){
        console.log("calling this"+jidd);
        res.send("save this jid: " + jidd);

    } , 2000); */
  

    
}

);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


function create(userEmailAccount, userPassword, userFirstname, userLastname,cb){



console.log("before");

let prom= rainbowSDK.admin.createUserInCompany(userEmailAccount, userPassword, userFirstname, userLastname,"5e4d7408b4528b74a00c90bb").then((user) => {
    let jid = user.jid_im;
console.log(jid);  
  rainbowSDK.invitations.sendInvitationByEmail(userEmailAccount).then((obj)=>{console.log("yes invite sent");cb(user.jid_im);}).catch((ee)=>{console.log("invite didnt work");console.log(ee);return "invite didnt work";});
    rainbowSDK.im.sendMessageToJid("Hi Welcome to Rainbow! Our agent will be with you shortly!" , jid);
    
    console.log("suppp");
   
   
console.log("addwed");

//rainbowSDK.sto();
// Do something when the user has been created and added to that company

}).catch((err) => {

// Do something in case of error
console.log(err);
//return "error";
console.log("UH OH");
//rainbowSDK.stop();
});

}
rainbowSDK.events.on("rainbow_onready", () => {
 console.log("ready");
    // Get your network's list of contacts
    
   
    
    
    
});
