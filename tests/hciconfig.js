var BluetoothScanner = require("../bluetooth.js");

var scanner = new BluetoothScanner("hci0");

scanner.getHciconfig(function(err, data) {
  if (!err) {
    console.dir(data);
  }
  else {
    console.error(err.message);
  }
});
