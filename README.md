A Bluetooth logger
========

And maybe even more...

This is part of a little project, which will attempt to demonstrate security considerations
to using Bluetooth.

I didn't find any other node.js libraries that had what I wanted, so I'm creating one myself.
The logger/confifǵuration part could branch off as a standalone library.

Also, this could be a easy-to-use commandline utility.

You could use this in a nice Bluetooth scanning web interface.

Usage (for testing)
========

```
-h, --help      -- this
-i, --interface The Bluetooth Network interface (default: hci0)
--info          -- Shows the Bluetooth device configuration (in JSON).
--scan          -- Scans for nearby devices and returns an array (*not yet parsed*)
```

Status
========

~~Finish/improve hciconfig -> JS Obj parser.~~

Fully implement scanning.

Add packet sniffing functions

Do even more (maybe).
