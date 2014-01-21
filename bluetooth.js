var exec = require("child_process").exec,
    colors = require("colors");

function BluetoothScanner(device, cb) {  
  this.hcidev = device;
  this.hciconfig = "hciconfig" + " -a " + device;
  if (cb && typeof(cb) === "function")
    cb(); 
}

BluetoothScanner.prototype.getHciconfig = function(cb) {
  exec(this.hciconfig, function(err, stdout, stderr) {
    if (!err) {
      var hcidev = this.hcidev;
      var lines = stdout.split("\n");
      var hciInfo = {};

      lines.forEach(function(line) {
        // Filter out the "hci0" at the beginning.
        if (/^hci/.test(line)) {
          line = line.slice(line.indexOf(":") + 1, line.length);
        }

        var separatorIndex = line.indexOf(":");
        var objIndex =  line.slice(0, separatorIndex)
                        .replace(/\t/, ""); // Ugh, tabs.
        var objValue =  line
                        .slice(separatorIndex + 1, line.length)
                        .replace(/\t/, "")
                        .trim(); // Remove whitespace at both ends.
    
        // Split up the Type line into "Type" and "Bus".        
        if (objIndex === "Type") {
          var split = objValue.split(" ");
          hciInfo[objIndex] = split[0];
          hciInfo[split[2].slice(0, split[2].length - 1)] = split[3]
        }
        // Split Bluetooth Address
        else if (objIndex === "BD Address") {
          var split = objValue.split(" ");
          hciInfo[objIndex] = split[0];
          hciInfo[split[2] + " " + split[3]] = split[4];
          hciInfo[split[6] + " " + split[7]] = split[8];
        }
        // Show State more conveniently
        else if (/UP/.test(objIndex)) {
          hciInfo["State"] = "UP";
        }
        else if (/DOWN/.test(objIndex)) {
          hciInfo["State"] = "DOWN";
        }
        // Turn RX/TX info into subobjects.
        else if (/(RX bytes)|(TX bytes)/.test(objIndex)) {
          var rxInfo = {};
          var split = objValue.split(" ");
          rxInfo["bytes"] = split[0];
          split.forEach(function(item) {
            var rxSplit = item.split(":");
            rxInfo[rxSplit[0]] = rxSplit[1];  
          });
          var indexName = /RX|TX/.exec(objIndex)[0];
          hciInfo[indexName] = rxInfo;
        }
        // Turn array-like properties into arrays.
        else if (/(Features)|(Packet type)|(Link policy)/.test(objIndex)) {
          var objArray = objValue.split(" ");
          hciInfo[objIndex] = objArray;
        }
        
        else if (/(HCI Version)|(LMP Version)/.test(objIndex)) {
          var info = {};
          var split = objValue.split(" ");
          info[objIndex.split(" ")[1]] = split[0] + " " + split[1];
          info[split[3]] = split[4];
          hciInfo[objIndex.split(" ")[0]] = info;
        }
        // If empty, drop (hciconfig prints empty lines).
        else if (objIndex !== "") {
          hciInfo[objIndex] = objValue;
        }
      });
      cb(hciInfo);
    }
    else {
      console.log("[Error]".red, err.message);
    }
  });
}

BluetoothScanner.prototype.isUp = function(cb) {
  this.getHciconfig(function(data) {
    cb(!!data["UP RUNNING"]);
  });
}

module.exports = BluetoothScanner;