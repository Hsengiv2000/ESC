const express = require('express')
const app = express();
const port = 1212;
var cors = require("cors");
app.use(cors({credentials: true})); 
var test = []
app.get('/', (req,res)=>{
    res.send({"msgs":test});
    test=[];
});
app.get('/a' , (req,res)=>{
var string = req.query["m"];
test.push(string);
res.send({"msgs":test});
});
setTimeout(function(){test="sup";},10000);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))