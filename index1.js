let RainbowSDK = require("rainbow-node-sdk");
var userList = [{name: "Josiah C" ,email: "josiah@gmail.com" , "ID" :"5e517abbb4528b74a00c92ad" , "JID": "aa9dff18ce52460489d46b4b6c80bd16@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false, "skill":3 }
             ,  {name: "Teck Leck" ,email: "teckleck@gmail.com" , "ID" : "5e57ecc76c332176648fcec4" , "JID":"2e809a000f564159b53cad98341f426a@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false , "skill" :4 },
                 {name: "amanda kosim" , email:"amandakosim@lolz.com" , "JID":"87e2d9330cd3494c9538495d3bb020ed@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"}];
var index = 1;
var busy = false;

function setBusy(timer){
    console.log("agent busy now");
    busy= true;
    setTimeout(function(){console.log("agent not busy  " ); busy =false;}, timer);
}
function createOptions(){

    let newopt = {
        rainbow: {
            host: "sandbox"
        },
        credentials: {
            login: userList[index].email,//"teckleck@gmail.com",//"rahul_parthasarathy@mymail.sutd.edu.sg", // To replace by your developer credendials
            password: "Password1*"//"rBNcm06IMy/0" // To replace by your developer credentials
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
rainbowSDK.events.on("rainbow_onready", () => {
    
    // Get your network's list of contacts
    let contacts = rainbowSDK.contacts.getAll();
    //Josiah is  '5e5b88c36c332176648fdd51'
    rainbowSDK.contacts.getContactById("5e57ecc76c332176648fcec4").then((contact) => {
        if(contact) {
            // Do something with the contact found
            console.log("SUPFROMTHEOTHERSIDE");
           // console.log(contact);
        }
        else {
            // Do something if the contact has not been found (id should be incorrect)
            console.log("not foudn sia");
        }
    }).catch((err) => {
        // Do something in case of failure
        console.log("error lorh");
    });
    
    // Do something with this list
    console.log("HELLOFROMTHEOTHERSIDE");
    //console.log(contacts);
    
});

rainbowSDK.start();

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
    if(busy!=true){
    
    // Check if the message comes from a user

    let msg =message.conversation.lastMessageText;
    console.log(message.fromJid);
    
    switch(msg){
case "hi":
rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
break
case "my shopping cart is always empty":
userList[index].busy  = true;
rainbowSDK.im.sendMessageToJid("hit refresh on the top right should fix, if not call hotline 83838333", message.fromJid);
break;
case "broken product arrived":
rainbowSDK.im.sendMessageToJid("refund will be provided. send pics to help@sutdlols.com", message.fromJid);
break;
case "contact details":
rainbowSDK.im.sendMessageToJid("contact: 38383838, email : sutdldlld@mamam.com", message.fromJid);
break;
case "thank you":
rainbowSDK.im.sendMessageToJid("hope you have a great day!", message.fromJid);
break;
default:
rainbowSDK.im.sendMessageToJid("invalid question", message.fromJid);
   break; }
   console.log("agent is busy");
   setBusy(23000);
    }
    else{
    rainbowSDK.im.sendMessageToJid("Agent is busy", message.fromJid);
    }

//rainbowSDK.im.sendMessageToJid("I AM BUSY", message.fromJid);
    //console.log(message.conversation.Conversation.contact.lastMessageText);
});

