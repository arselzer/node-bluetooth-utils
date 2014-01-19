var exec = require("child_process").exec;

exec("hciconfig", function(err, stdout, stderr) {
  if (!err) {
    process.stdout.write("stdout:" + stdout);
  }
  else {
    console.log("[Error]", err);
  }
});

var Scanner = require("ble-scanner");

scanner = new Scanner("hci0", function(packet) {
  console.log("Received packet", packet);
});
