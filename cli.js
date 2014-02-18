var argv = require("optimist").argv,
    fs = require("fs"),
    BluetoothScanner = require("./index.js");

function help() {
  fs.createReadStream("usage.txt")
  .on("end", function() {
    process.exit();
  })
  .pipe(process.stdout);
}

var hcidev = argv.interface || argv.i || "hci0";
var scanner = new BluetoothScanner(hcidev);

if (argv.help || argv.h) {
  help();
}

if (argv.info) {
  scanner.getHciconfig(function(err, result) {
    if (!err) {
      console.log(JSON.stringify(result, null, 2) /* pretty format - 2 spaces */);
    }
    else {
      console.error("[Error]".red, err.message);
    }
  });
}

if (argv.scan) {
  scanner.scan(function(err, result) {
    if (!err) {
      console.log(JSON.stringify(result, null, 2));
    }
    else {
      console.error("[Error]".red, err.message);
    }
  });
}
