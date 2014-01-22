var BluetoothScanner = require("../bluetooth.js");

var scanner = new BluetoothScanner();

scanner.getDevices(function(err, data) {
  if (!err)
    console.dir(data);
  else
    console.error(err.message);
});
