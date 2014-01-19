var exec = require("child_process").exec,
    colors = require("colors");

function BluetoothScanner(device, cb) {  
  this.hciconfig = "hciconfig" + " -a " + device;
  
  this.getHciconfigData("hci0", function() {});
  this.isUp(device, function() {});
  cb();
}

BluetoothScanner.prototype.getHciconfigData = function(dev, cb) {
  exec(this.hciconfig, function(err, stdout, stderr) {
    if (!err) {
      process.stdout.write("hciconfig:\n" + stdout);
      
      var lines = stdout.split("\n");
      var hciInfo = {}
      
      lines.forEach(function(line) {
        var sepparatorIndex = line.indexOf(":");
        var objIndex = line.slice(0, sepparatorIndex).replace(/\t/, ""); // Ugh, tabs.
        var objValue = line.slice(sepparatorIndex + 1, line.length).replace(/\t/, "");
        hciInfo[objIndex] = objValue;
      });
      console.dir(hciInfo);
    }
    else {
      console.error("[Error]".red, err.message);
    }
  });
}

BluetoothScanner.prototype.isUp = function(dev, cb) {

}

module.exports = BluetoothScanner;
