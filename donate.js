//setup things
var iot = require('./core/gpio.js');
var web3 = require('./core/blockchain.js');
var sleep = require('sleep');

var addr = "0x48dbDa9443746A99eF1b26aB01DD94aC50D7014b";

//inital value to test blinking
var balance = 16385.1;

iot.led.digitalWrite(0); 
console.log('running'); 

//get the inital balance
 try {
   var bal = web3.eth.getBalance(addr) *.000000000000000001;
    } 
 catch (err){
   console.log(err);
 };
 
//sanity check
console.log(bal+ " " + balance);


//main function
function blink(){

//get balance
try{  
  var bal = web3.eth.getBalance(addr) *.000000000000000001;
  } 
catch (err){
  console.log(err);
};    

//do something if different
if(bal > balance){
      console.log(bal+ " " + balance);
      count =  bal - balance;
	    balance=bal;        
	    console.log(count);
  //breakout logic for big transactions    
      if(count>=1){
//100s
        for(i = 0; i< Math.floor(count/100 % 10); i++){
      		iot.led.digitalWrite(1);
        	console.log('on');
        	sleep.sleep(10);
        	iot.led.digitalWrite(0);
        	console.log('off');
        	sleep.sleep(1);
      		}
//tens 
        for(i = 0; i< Math.floor(count/10 % 10); i++){
          iot.led.digitalWrite(1); 
          console.log('on'); 
          sleep.sleep(5); 
          iot.led.digitalWrite(0);
          console.log('off');
          sleep.sleep(1);
    		}
//ones                                                    
       for(i = 0; i< Math.floor(count % 10); i++){
                iot.led.digitalWrite(1);
                console.log('on');
                sleep.sleep(2);
                iot.led.digitalWrite(0);
                console.log('off');
                sleep.sleep(1);  
		    }     
//sanity check
  console.log('loop');                       
  blink();
} else{
  //less than one blink 5 times  
    for(i = 0; i< 5; i++){
                iot.led.digitalWrite(1);
                console.log('on');
                sleep.sleep(1);
                iot.led.digitalWrite(0);
                console.log('off');
                sleep.sleep(1); 
              }
      blink();
    }
}
//if nothing changed do nothing
   console.log("bottom");
   sleep.sleep(2);
   blink();                                                    
}

//run main function
blink();
