var Gpio = require('pigpio').Gpio,
  led = new Gpio(2, {mode: Gpio.OUTPUT});


console.log('IoT loaded');

exports.led = led;


