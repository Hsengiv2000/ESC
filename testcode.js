const express = require('express')
const app = express();
const port = 1212;
var cors = require("cors");
app.use(cors({credentials: true})); 
app.use(express.static('public'))
var test = []
app.get('/route1',function(req,res){
    res.sendfile("./public/index.html")
  });
  

app.get('/a' , (req,res)=>{
    res.redirect('/route1?a=123');
});
setTimeout(function(){test="sup";},10000);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))