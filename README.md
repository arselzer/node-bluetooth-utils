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
--help, -h      -- this
--interface, -i -- The Bluetooth Network interface (default: hci0)
--info          -- Shows the Bluetooth device configuration (in JSON).
```

Status
========

~~Finish/improve hciconfig -> JS Obj parser.~~

Implement the scanning.

Do even more (maybe).
