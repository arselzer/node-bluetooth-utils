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

if (argv.help || argv.h) {
  help();
}

var scanner = new BluetoothScanner(argv.interface || argv.i || "hci0", function() {
   
});

