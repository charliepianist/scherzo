#!/bin/bash
# Navigate to the correct directory
cd "${0%/*}"
cd ..

# Popup.js
ECHO "Compiling popup.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.popup \
    --js_output_file bin/js/popup.js
# Background.js
ECHO ""
ECHO "Compiling background.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.background \
    --js_output_file bin/js/background.js
# Options.js
ECHO ""
ECHO "Compiling options.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.options \
    --js_output_file bin/js/options.js

# Indicator of completion
ECHO ""
ECHO "Done!"