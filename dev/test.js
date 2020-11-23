const Blockchain = require('./blockchain');

const  bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'OINA90SDNF90N', '90ANSD9F0N9009N');
bitcoin.createNewBlock(111,  'JK576ERV200FD', 'H857FB348UJLS0D');
bitcoin.createNewTransaction(10000,'kalenshi@gmail.com', 'bchibwata@yahoo.com');
bitcoin.createNewTransaction(44,'musonda@gmail.com', 'mazuba@hotmail.com');
bitcoin.createNewTransaction(1799,'meyo@glycos.com', 'schooled@yahoo.com');

bitcoin.createNewBlock(2899, 'NHDSFGK864G11', 'K2HJCHY756HUKD5');

console.log(bitcoin);
// console.log(bitcoin.getLastBlock());