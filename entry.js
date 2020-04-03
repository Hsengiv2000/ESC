let RainbowSDK = require("rainbow-node-sdk");



var userList = [{name: "Josiah C" ,email: "josiah@gmail.com" , "ID" :"5e517abbb4528b74a00c92ad" , "JID": "aa9dff18ce52460489d46b4b6c80bd16@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false, "skill":3 }
             ,  {name: "Teck Leck" ,email: "teckleck@gmail.com" , "ID" : "5e57ecc76c332176648fcec4" , "JID":"2e809a000f564159b53cad98341f426a@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false , "skill" :4 },
                 {name: "amanda kosim" , email:"amandakosim@lolz.com" , "JID":"87e2d9330cd3494c9538495d3bb020ed@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"}];

var index = 0;
const prompt = require('prompt-sync')({sigint: true});
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
var ready = false;
// Start the SDK

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
        let guess = prompt("enter your question"); 
       //
       rainbowSDK.im.sendMessageToJid(guess, userList[0].JID);
       let contacts = rainbowSDK.contacts.getAll();
      // console.log(contacts);
      // var hadnle =rainbowSDK.webRTC.callInAudio(contacts[0]);
      // var release= rainbowSDK.telephony.makeCall("10582773945003141" , "sup");
     

      // console.log(rainbowSDK.calllog.getAll());
});

rainbowSDK.start();
function ask() {
    // Ask for name until user inputs "done"
    let guess = prompt("questin enna"); 
    rainbowSDK.im.sendMessageToJid(guess, message.fromJid);
      if(guess == "done"){
          console.log('we are done');

      }
      else{
          console.log("once more");
          ask();
      }
        
   
}
let clientIndex = 0;
rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
console.log("here");
let guess = prompt("enter your question"); 
console.log(clientIndex);
let prom = rainbowSDK.im.sendMessageToJid(guess, userList[clientIndex].JID);
clientIndex = (clientIndex +1) %3
  

});


// Random number from 1 - 10

// This variable is used to determine if the app should continue prompting the user for input


