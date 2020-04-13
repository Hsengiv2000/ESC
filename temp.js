let RainbowSDK = require("rainbow-node-sdk");


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express')
const app = express()
const cors = require("cors");
app.use(express.static('public'))
app.use(cors({credentials: true})); 

const port = 3002
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatnomechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


const prompt = require('prompt-sync')({sigint: true});

function createOptions(eml, pwd){

    let newopt = {
        rainbow: {
            host: "sandbox"
        },
        credentials: {
            login: eml,//"rahul_parthasarathy@mymail.sutd.edu.sg", // To replace by your developer credendials
            password: pwd//"rBNcm06IMy/0" // To replace by your developer credentials
        },
        // Application identifier
        application: {
            /*
            appID: "a08bef9055ad11eabb3887f44e39165a",
            appSecret: "MY6oXMVM51aMUwIpTQz5DB6L0lXBcNe5VQeqKtws2NpSbCxc5sPv5pMUTiImNjjq" */
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



// Start the SDK

let rainbowSDK;
let agentId;
let myId;
app.get('/gotjid' ,(req,res)=>{
    agentId = req.query["aid"];
    myId = req.query["myid"];
    res.sendfile("./signin.html");
});
app.get('/stop' , (req,res)=>{
    rainbowSDK.stop();
    res.sendfile("./fashion.html");
});
app.get('/send',(req, res)=>{
    var msg = req.query["msg"];

    msg = msg.replace(/%%/g , " ");
    res.send("recieved");
    console.log(msg);
    console.log(agentId);
    rainbowSDK.im.sendMessageToJid(msg, agentId);
})
var test=[]
app.get('/recieve',(req,res)=>{
    let ind = parseInt(req.query["ind"]);
    res.send({"msgs":test.slice(ind)});
    
});
app.get('/signin', (req, res)=> {
  
    userEmailAccount = req.query['email'];
    userPassword = req.query['password'];
   
    console.log(userPassword);
    console.log(userEmailAccount);
    var options = createOptions(userEmailAccount, userPassword);

// Instantiate the SDK

 rainbowSDK = new RainbowSDK(options);
ready=true;
console.log("ready");
    rainbowSDK.start();
    //userLastname = "ssss";
    enable();
    
    res.sendfile("./public/index.html");



    
}

);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

console.log("HEE");

function enable(){
    rainbowSDK.events.on('rainbow_onstopped' , (message)=>{

        console.log("stopped");
        httpGetAsync("http://ec2-18-223-16-89.us-east-2.compute.amazonaws.com:1334/disconnect?djid="+myId+"&daid="+agentId,(res)=>{console.log(res)});
       // httpGetAsync("http://localhost:1333/disconnect");
        
    });
    
   
console.log("sipp");
rainbowSDK.events.on("rainbow_onready", () => {
    // Get your network's list of contacts
console.log(rainbowSDK);
    // Do something with this list
    console.log("HELLOFROMTHEOTHERSIDE");
    //console.log(contacts);
    ready = true;
        console.log(ready);
    var i =10;
    var index = 0;
  
        console.log('in here');
        // Get user input
     
        // Convert the string input to a number
        
        console.log(rainbowSDK.call);
       // let guess = prompt("enter your question"); 
       //
    
       let contacts = rainbowSDK.contacts.getAll();
      // console.log(contacts);
      // var hadnle =rainbowSDK.webRTC.callInAudio(contacts[0]);
      // var release= rainbowSDK.telephony.makeCall("10582773945003141" , "sup");
     

      // console.log(rainbowSDK.calllog.getAll());
});

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
    if(message.fromJid == agentId){
    test.push(message.content);
    }
console.log(message.content);


  
});     }



// Random number from 1 - 10

// This variable is used to determine if the app should continue prompting the user for input


