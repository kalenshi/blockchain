const express = require('express');
const Blockchain = require('./blockchain');
const PORT = process.argv[2]; //env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');

const uuid = require('uuid');
const nodeAddress = uuid.v1().split('-').join();

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
    const previousBlockHash = bitcoin.getLastBlock().hash;
    const currentBlockData = {
        pendingTransactions: bitcoin.pendingTransactions,
        index: bitcoin.getLastBlock()['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const currentHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    //reward the miner with 12.5 bitcoins
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const minedBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentHash);
    res.json({
        message: "New block mined successfully",
        newBlock: minedBlock
    });
 
});

app.post('/register-and-braodcast-node', (req, res)=>{
    //register a node and broadcast that node to the entire network
    const {newNodeUrl} = req.body;
});

app.post('/register-node', (req, res)=>{
//register a node with the network
});

app.post('/register-nodes-bulk', (req, res)=>{
    //register multiple nodes at once
});

app.listen(PORT, ()=> {
    console.log(`Now listening on Port: ${PORT}...`);
});