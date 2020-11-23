const express = require('express');

const blockchain = require('./blockchain');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/blockchain',(req, res)=>{
    //send back the entire block chain
    let b = blockchain();
    console.log(JSON.parse(b));
    res.status(200).send({'name':"kalenshi"});
});

app.post('/transaction',(req, res)=>{
    //the endpoint to cerate a new transaction on our block chain
});

app.get('/mine',(req, res)=>{
    //mine or create a new block for us
});

app.listen(PORT, ()=> {
    console.log(`Now listening on Port: ${PORT}`);
});