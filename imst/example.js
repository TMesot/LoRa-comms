#!/usr/bin/env node

var iM880 = require('./iM880');

// set the endpoint ID
DEVICE_ID = 0x04;
DEVICE_GROUP = 0x10;

// call the construction with and endpointID
device = new iM880(DEVICE_ID, DEVICE_GROUP);
// wait for config-done message and print endpointID
var msg = new Uint8Array([ 9, 8, 10, 67, 89, 100, 43]);
device.on('config-done', function(statusmsg) {
  // print the ID of the endpoint
  console.log('Configuration status: ' + statusmsg);
  // send a message
  device.send(0x10, 0x0009, msg);
});

// listen for new messages and print them
device.on('rx-msg', function(data) {
  // print rx message without slip encoding or checksum
  console.log('Received message!!');
  console.log('    destGroupAddr: ' + data.destGroupAddr);
  console.log('   destDeviceAddr: ' + data.destDeviceAddr);
  console.log('     srcGroupAddr: ' + data.srcGroupAddr);
  console.log('    srcDeviceAddr: ' + data.srcDeviceAddr);
  console.log('          payload: ' + data.payload);
  console.log('     receivedTime: ' + data.receivedTime);
;
});

// listen for transmit done events
device.on('tx-msg-done', function(statusmsg) {
    // print out tx msg
    console.log('Tx-status: ' + statusmsg);
});