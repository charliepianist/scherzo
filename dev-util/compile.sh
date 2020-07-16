#!/bin/bash
# Navigate to the correct directory
cd "${0%/*}" > /dev/null 2>&1
cd ..

# Popup.js
ECHO "Compiling popup.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.popup \
    --compilation_level ADVANCED \
    --js_output_file bin/js/popup.js \
    \
    --warning_level=VERBOSE \
    --jscomp_off=nonStandardJsDocs \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/*.js \
    --hide_warnings_for src/js/lib/**/*.js \
    --hide_warnings_for src/js/lib/elliptic.js # For some reason, compiler started throwing warnings without this explicitly here
# Background.js
ECHO ""
ECHO "Compiling background.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.background \
    --compilation_level ADVANCED \
    --js_output_file bin/js/background.js \
    \
    --warning_level=VERBOSE \
    --jscomp_off=nonStandardJsDocs \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/*.js \
    --hide_warnings_for src/js/lib/**/*.js 
# Options.js
ECHO ""
ECHO "Compiling options.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/js/*.js \
    --js src/js/**/*.js \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.options \
    --compilation_level ADVANCED \
    --js_output_file bin/js/options.js \
    \
    --warning_level=VERBOSE \
    --jscomp_off=nonStandardJsDocs \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/*.js \
    --hide_warnings_for src/js/lib/**/*.js 

# Indicator of completion
ECHO ""
ECHO "Done!"