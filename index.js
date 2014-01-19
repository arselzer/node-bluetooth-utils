var argv = require("optimist").argv,
    fs = require("fs"),
    BluetoothScanner = require("./scanner.js");

function help() {
  fs.createReadStream("help.txt")
  .on("end", function() {
    process.exit();
  })
  .pipe(process.stdout);
}

var hcidev = argv.interface || argv.i || "hci0";

if (argv.help || argv.h) {
  help();
}

if (argv.info) {
  var scanner = new BluetoothScanner(hcidev);
  scanner.getHciconfig(function(config) {
    console.log(JSON.stringify(config, null, 2));
  });
}
