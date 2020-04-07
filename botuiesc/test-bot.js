var loadingMsgIndex,
    botui = new BotUI('stars-bot'),
    API = '';
function httpGetAsync(theUrl, callback)
{  console.log('here');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatnomechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    //xmlHttp.withCredentials = true;
    console.log('vandahd');
    xmlHttp.send(null);
}

function sendXHR(repo, cb) {
  var xhr = new XMLHttpRequest();
  var self = this;
  xhr.open('GET', API + repo);
  xhr.onload = function () {
    var res = JSON.parse(xhr.responseText);
    cb(res);
  }
  xhr.send();
}
function init() {
  console.log("supp");

  setInterval(function(){sendXHR("http://localhost:3002/recieve", (msg)=>{

for(let i = 0; i < msg["msgs"].length;i++){
    botMsg(msg["msgs"][i]);}


  });} , 3000);
  

 
  

}

function showStars(stars) {
  botui.message
  .update(loadingMsgIndex, {
    content: stars
  })
  .then(init); // ask again for repo. Keep in loop.
}
function humanMsg(msg){

   botui.message.add({
    human:true,
        content: msg

      });

}
function send(){

getText();

}
function botMsg(msg){

  botui.message.add({

    content: msg
  });
}
function getText(){
console.log(4);
var string = document.getElementById("input").value;
humanMsg(string);
sendXHR("http://localhost:3002/send?msg="+string.replace(/ /g, "%%")  , (msg)=>{console.log("recieved")});


}
function disconnect(){
sendXHR("http://localhost:3002/stop", (msg)=>{console.log("recieved")});

}
init();