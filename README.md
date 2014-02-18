A Bluetooth logger/sniffer/configuration viewer
========

*Warning:*
This is not a high-performance Bluetooth library.
It does not have direct C/C++ bindings to the Linux bluetooth stack.

The main focus is to just parse Bluetooth device information in a
JavaScript-friendly way.

It is part of a little project, which will attempt to demonstrate security considerations
to using Bluetooth.

A easy-to-use command line utility is included.


## Usage

### Library

```JavaScript
var Bluetooth = require("./index.js");

var blue = new Bluetooth("hci0");

// Change the device.
blue.setDevice("hci1");

// Get the Bluetooth configuration (hciconfig).
blue.getHciConfig(function(err, settings) {
  if (err) throw err;
  console.dir(settings);
});

// Get a list of responding nearby hosts.
blue.scan(function(err, hosts) {
  if (err) throw err;
  console.dir(hosts):
});

// Get a list of all hci devices.
blue.getDevices(function(err, devices) {
  ir (err) throw err;
  console.dir(devices);
});
```

## Example

### Device Information Output

```
{
  "Type": "BR/EDR",
  "Bus": "USB",
  "BD Address": "E0:F8:47:15:E6:1B",
  "ACL MTU:": "1021:8",
  "SCO MTU:": "64:1",
  "State": "UP",
  "RX": {
    "bytes": "977",
    "acl": "0",
    "sco": "0",
    "events": "42",
    "errors": "0"
  },
  "TX": {
    "bytes": "654",
    "acl": "0",
    "sco": "0",
    "commands": "41",
    "errors": "0"
  },
  "Features": [
    "0xff",
    "0xff",
    "0xcf",
    "0xfe",
    "0x9b",
    "0xff",
    "0x79",
    "0x83"
  ],
  "Packet type": [
    "DM1",
    "DM3",
    "DM5",
    "DH1",
    "DH3",
    "DH5",
    "HV1",
    "HV2",
    "HV3"
  ],
  "Link policy": [
    "RSWITCH",
    "HOLD",
    "SNIFF",
    "PARK"
  ],
  "Link mode": "SLAVE ACCEPT",
  "Name": "'Apple Bluetooth Device'",
  "Class": "0x000000",
  "Service Classes": "Unspecified",
  "Device Class": "Miscellaneous,",
  "HCI": {
    "Version": "2.1 (0x4)",
    "Revision:": "0x335"
  },
  "LMP": {
    "Version": "2.1 (0x4)",
    "Subversion:": "0x4229"
  },
  "Manufacturer": "Broadcom Corporation (15)"
}
```

## Status

~~Finish/improve hciconfig -> JS Obj parser.~~

Fully implement scanning.

Add packet sniffing functions

Do even more (maybe).
