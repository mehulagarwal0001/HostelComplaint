const express = require('express');
const ConnectToMongo=require('./moongose');


const app= express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello');
})

var uri="mongodb://localhost:27017/HostelMangament";

ConnectToMongo(uri);




app.use('/auth',require('./routes/auth'));
 app.use('/complaint', require('./routes/complaint'));

app.listen(5000,()=>{
    console.log("server is listiening on server 5000");
})


