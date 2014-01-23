var BluetoothScanner = require("../bluetooth.js");

var scanner = new BluetoothScanner("hci0");

scanner.isUp(function(err, isit) {
  if (!err)
    console.log("Device up?", isit);
  else
    console.log(err.message);
});
