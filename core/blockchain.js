/*
* web3 stuff
*/

const Web3 = require('web3');
//var uri = "http://localhost:8545";
//using the public api because I dont want to give my endpoint to the world
var uri =  "https://etc-parity.0xinfra.com/";
module.exports = new Web3(new Web3.providers.HttpProvider(uri));
