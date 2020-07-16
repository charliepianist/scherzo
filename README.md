## Scherzo

A chrome privacy extension. Currently the files are pretty much entirely filler, but the general structure should not change too much in the future.

### Compiling and Running
#### Compiling
To compile, just run [dev-util/compile.sh](dev-util/compile.sh) (e.g. with ```bash dev-util/compile.sh```), and the compiled JavaScript files will be put in [bin/js](bin/js).

#### Running
To run the extension, go to Extensions and enable developer mode, then click on "Load unpacked". The extension should now be ready to test.

### Todos
- Set up a testing environment! Probably using Closure + JSUnit.

### Files not on Github
- bin/ - compiled and minified JS files
- docs/ - Planning and other documentation files
- src/js/crypto/ - Various functions and wrappers of crypto libraries
- src/js/closure-library/ - Google's Closure Library (see [here](https://developers.google.com/closure/library/docs/gettingstarted) for how to download)

### Modifications to Libraries
- [sjcl.js](src/js/lib/sjcl.js) - Lines 1-8 are just compiler annotations and goog.provide
- [elliptic.js](src/js/lib/elliptic.js) - Lines 1-5 are just compiler annotations and goog.provide, line 24 is to properly export elliptic.ec for use in other files.