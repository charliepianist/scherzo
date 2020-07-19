#!/bin/bash
# Navigate to the correct directory
cd "${0%/*}" > /dev/null 2>&1
cd ..
cd ..
cd ..

# Header
ECHO "----------------------------------------------------------------------"
ECHO "|                  Compiling scherzo.crypto tests...                 |"
ECHO "----------------------------------------------------------------------"

# auth_test.js
ECHO "Compiling auth_test.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/ \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.crypto.authTest \
    --js_output_file bin/test/crypto/auth_test.js \
    \
    --warning_level=VERBOSE \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/ \
    --hide_warnings_for src/js/closure-library/

# hash_test.js
ECHO "Compiling hash_test.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/ \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.crypto.hashTest \
    --js_output_file bin/test/crypto/hash_test.js \
    \
    --warning_level=VERBOSE \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/ \
    --hide_warnings_for src/js/closure-library/

# pkc_test.js
ECHO "Compiling pkc_test.js..."
ECHO "======================================================================"
java -jar dev-util/closure-compiler-v20200614.jar \
    --js src/ \
    --externs src/js/lib/*.js_externs \
    --dependency_mode=PRUNE \
    --entry_point=scherzo.crypto.pkcTest \
    --js_output_file bin/test/crypto/pkc_test.js \
    \
    --warning_level=VERBOSE \
    --jscomp_warning=extraRequire \
    --jscomp_warning=missingRequire \
    --jscomp_warning=missingProvide \
    --jscomp_warning=missingReturn \
    --jscomp_warning=unusedLocalVariables \
    --jscomp_warning=unusedPrivateMembers \
    --hide_warnings_for src/js/lib/ \
    --hide_warnings_for src/js/closure-library/

# Indicator of completion
ECHO "----------------------------------------------------------------------"
ECHO "|              Finished compiling scherzo.crypto tests!              |"
ECHO "----------------------------------------------------------------------"