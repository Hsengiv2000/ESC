let RainbowSDK = require("rainbow-node-sdk");


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express')
const app = express()
const cors = require("cors");
var compression = require('compression');
app.use(compression());
app.use(express.static('public'));
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

const prompt = require('prompt-sync')({sigint: true});
class RainbowUsers{


    initSDK(options,cb)
    {
        this.rainbowSDK  = new RainbowSDK(options);
      
        this.test=[];
        this.rainbowSDK.start().then(()=>{console.log("okay it works");cb(1);}).catch((err)=>{console.log("wrong pwd");           httpGetAsync("http://ec2-18-223-16-89.us-east-2.compute.amazonaws.com:1334/disconnect?djid="+this.myId+"&daid="+this.agentId,(res)=>{console.log(res)});
 cb(0);});
  
        this.enable();
    }

    constructor(aid, jid)
    {
        this.myId = jid;
        this.agentId = aid;
    }
    send(msg)
    {
        this.rainbowSDK.im.sendMessageToJid(msg, this.agentId).then((mssg)=>{console.log(mssg)});
    }
    enable()
    {
        this.rainbowSDK.events.on('rainbow_onstopped' , (message)=>{
    
            console.log("stopped");
            // this.rainbowSDK.stop();
           // httpGetAsync("http://localhost:1333/disconnect");
            
        });
        
       
    console.log("sipp");
    this.rainbowSDK.events.on("rainbow_onready", () => {
        // Get your network's list of contacts
 //   console.log(this.rainbowSDK);
        // Do something with this list
        console.log("HELLOFROMTHEOTHERSIDE");
        //console.log(contacts);
    
        var i =10;
        var index = 0;
      
        console.log('in here');
        
         
    });
    
    this.rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
        if(message.fromJid == this.agentId || message.fromJid =="5e0d870daebd4ad7bff9a9b34fd53bfe@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"){
       
if(message.fromJid ==="5e0d870daebd4ad7bff9a9b34fd53bfe@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"){this.agentId = message.content;this.test.push("Hey, how may I help you?");}
   //     console.log(message.fromJid);
 //this.test.push("Hi How may I help you?");
 else{       
this.test.push(message.content);}
   } console.log(message.fromJid + "  " + this.agentId);
    console.log(message.content);
    
    
      
    });     }
}




// Start the SDK
let users = new Object();
app.get('/updatejid' , (req,res)=>{

agentId = req.query["aid"];
myId = req.query["cid"];
users[myId].agentId = agentId;
console.log("RECEIVED A JID UPDATE");
console.log(users[myId].agentId);
res.send("updated");

});
app.get('/gotjid' ,(req,res)=>{
    agentId = req.query["aid"];
    myId = req.query["myid"];
    userEmailAccount = req.query['email'];
    userPassword = req.query['pwd'];
    console.log(agentId, myId, userEmailAccount, userPassword);
    var user = new RainbowUsers(agentId, myId);
try{ 
   user.initSDK(createOptions(userEmailAccount,userPassword),(a)=>{

if(a==1){if(agentId.length >70){
     
     res.redirect("/chat?jid="+myId+"&flag=true");
     }
    else{res.redirect("/chat?jid="+myId+"&flag=false");}
    users[myId] =  user;
    console.log(users);
}
else{res.redirect("/wrongpwd?alert=true");}
});
   } catch(err){console.log("CATCHING");res.redirect("/wrongpwd?alert=true");}
    
});
app.get('/wrongpwd',(req,res)=>{
res.sendfile("./public/assistance.html");
});
app.get('/chat' , (req,res)=>{

    res.sendfile("./public/index.html");

});
app.get('/stop' , (req,res)=>{
    myId = req.query["myid"];
    httpGetAsync("http://ec2-18-223-16-89.us-east-2.compute.amazonaws.com:1334/disconnect?djid="+myId+"&daid="+users[myId].agentId,(res)=>{console.log(res)});
           console.log("attempting to stop");
 users[myId].rainbowSDK.stop();
res.send("stopping");  
  //res.sendfile("./public/fashion.html");
});
app.get('/send',(req, res)=>{
    var msg = req.query["msg"];
    var id = req.query["jid"];

    msg = msg.replace(/%%/g , " ");
    res.send("recieved");
    console.log(msg);
    users[id].send(msg);
    
})

app.get('/recieve',(req,res)=>{
    let ind = parseInt(req.query["ind"]);
    let id = req.query["jid"];
     
   //console.log(users[id])
    res.send({"msgs":users[id].test.slice(ind)});
    
});
/*
app.get('/signin', (req, res)=> {
  
    userEmailAccount = req.query['email'];
    userPassword = req.query['password'];
   
    console.log(userPassword);
    console.log(userEmailAccount);
    var options = createOptions(userEmailAccount, userPassword);

// Instantiate the SDK


console.log("ready");
    rainbowSDK.start();
    
    
    res.sendfile("./public/index.html");



    
}

);
*/
app.get('/home' , (req,res)=>{
   console.log("sup");
    res.sendfile("./public/fashion.html");
 });
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

console.log("HEE");





// Random number from 1 - 10

// This variable is used to determine if the app should continue prompting the user for input


