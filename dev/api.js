const express = require('express');
const Blockchain = require('./blockchain');
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/blockchain',(req, res)=>{
    //send back the entire block chain
    res.send(bitcoin);
});

app.post('/transaction',(req, res)=>{
    //the endpoint to cerate a new transaction on our block chain
    const {amount, sender, recipient} = req.body;
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({message:`The transaction will be added in block : ${blockIndex}`});
});

app.get('/mine',(req, res)=>{
    //mine or create a new block for us
});

app.listen(PORT, ()=> {
    console.log(`Now listening on Port: ${PORT}`);
});