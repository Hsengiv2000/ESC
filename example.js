const express = require('express')
const app = express()
const port = 1333 //ipadreess:port/
app.get('/', (req, res)=> {
   let task = req.query["task"]; //TASK A OR B OR C OR D
   let type= req.query["type"];
   let jid = req.query["jid"]; // text OR call By defaul lets make it text
   console.log(task);
   console.log(type);
   console.log(jid);

   /*
    SEND REQUEST USING TASK AND TYPE
   */
    //userLastname = "ssss";
   // router.customer.sendrequest(task);
    res.send("Hello Word");

    
}

);
app.get('/disconnect' , (req,res)=>{

    res.send("sup");
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
