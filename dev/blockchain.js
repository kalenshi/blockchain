
const sha256 = require('sha256');

/**
 * 
 */
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(Math.floor(Math.random() * Math.floor(1000)), sha256('create'), sha256('genesis'));
}
/**
 * 
 * @param {*} nonce comes from a proof of work, it's just a number which proves we created this block in a legitimate way using a proof of work method
 * @param {*} previousBlockHash  data from the previous block hashed into a string
 * @param {*} hash all the transactions will be hashed to create a new hash that is passed into this function
 */
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        pendingTransactions: this.pendingTransactions,
        nonce: nonce, 
        hash: hash, 
        previousBlockHash: previousBlockHash, 

    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

/**
 * Retrieve and return the last block in the block chain
 */
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}

/**
 * Every transaction that is created has an amount,
 * a sender,a recipient
 * These transactions are pending until a new block 
 * is created, until they're verified
 * @param {*} amount amount of the transaction
 * @param {*} sender the address of the sender
 * @param {*} recipient the address of the recipient
 * @returns the index of the block where this transaction can be found
 */
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index'] + 1;
}
/**
 * 
 * @param {*} previousBlockHash 
 * @param {*} currentBlockData 
 * @param {*} nonce 
 */
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = `${previousBlockHash}${JSON.stringify(currentBlockData)}${nonce.toString()}`;
    return sha256(dataAsString);
}
/**
 * 
 * @param {*} previousBlockHash 
 * @param {*} currentBlockData 
 */
Blockchain.prototype.proofOfWork = function(previousBlockHash ,currentBlockData) {
    let nounce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nounce);
    while(!proofOfWork.startsWith('0000')){
        hash = this.hashBlock(previousBlockHash, currentBlockData, ++nounce);
    }
    return nounce;
}

module.exports =  Blockchain;