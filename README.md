## Scherzo

A chrome privacy extension. Encrypts messages before sending, then decrypts after receiving.

### Compiling and Running
#### Compiling
To compile, just run [dev-util/compile.sh](dev-util/compile.sh) (e.g. with ```bash dev-util/compile.sh```), and the compiled JavaScript files will be put in ```bin/js```.

#### Running
To run the extension, go to Extensions and enable developer mode, then click on "Load unpacked". The extension should now be ready to test.

### Testing
To test, run [dev-util/compile-test.sh](dev-util/compile-test.sh) to compile all testing js files (which will be put in ```bin/test```), then open the desired *_test.html file found in [src/](src/).

### Todos
- Set up an automated testing environment (plovr?)

### Files not on Github
- bin/ - compiled and minified JS files
- src/js/closure-library/ - Google's Closure Library (see [here](https://developers.google.com/closure/library/docs/gettingstarted) for how to download)

### Modifications to Libraries
- [sjcl.js](src/js/lib/sjcl.js) - Lines 1-8 are just compiler annotations and goog.module, last line is defining exports
- [elliptic.js](src/js/lib/elliptic.js) - Lines 1-5 are just compiler annotations and goog.module, all "exports" have been renamed to "exportsLocal" to avoid errors of assigning to exports in a different scope than module-level, and exports are assigned to "actualExports" object, in order to (at the end of the file) actually export the desired exports.