var iot = require('./core/gpio');

var web3 = require('./core/blockchain');
var sleep = require('sleep');


var ABI = [
  {
    "constant": false,
    "inputs": [],
    "name": "lightOff",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "timer",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_time",
        "type": "uint256"
      }
    ],
    "name": "setTimer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "deviceState_1",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "lightOn",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "fallback"
  }
];

// what contract are we going to interact with: CHANGE THIS
var ADDR = '0xc940Ed423B3cad125149AA48Ecf14a1aED299e86';

//contract
const iotd = new web3.eth.Contract(ABI, ADDR);

async function blocktime(){
	var block = await web3.eth.getBlock("latest").then(res => {console.log(res);});
	return block.timestamp;
}

async function localtime(time){
 	var timezone = 3600 * 5 *-1;
        var lt = new Date(time*1000+timezone);
	return lt;
}

//reset relay before starting
iot.led.digitalWrite(0);

async function main(){

for(i=0; i < 10000 ;i++){
  var d = await blocktime();
  var lt = await localtime(d);
  console.log("time: "+ lt);

  await iotd.methods.deviceState_1().call()
  .then( res => {
    console.log("current state:" + res);
    iot.led.digitalWrite(res);
 });
 sleep.sleep(5);
}
}

 main();
