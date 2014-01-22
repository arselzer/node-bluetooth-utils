var argv = require("optimist").argv,
    fs = require("fs"),
    BluetoothScanner = require("./bluetooth.js");

function help() {
  fs.createReadStream("usage.txt")
  .on("end", function() {
    process.exit();
  })
  .pipe(process.stdout);
}

var hcidev = argv.interface || argv.i || "hci0";

console.log("interface", hcidev);

if (argv.help || argv.h) {
  help();
}

if (argv.info) {
  var scanner = new BluetoothScanner(hcidev);
  scanner.getHciconfig(function(config) {
    console.log(JSON.stringify(config, null, 2));
  });
}

if (argv.scan) {
  var scanner = new BluetoothScanner(hcidev);
  scanner.scan(function(devices) {
    console.log(JSON.stringify(devices));
  });
}
