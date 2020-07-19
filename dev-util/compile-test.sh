#!/bin/bash
# Navigate to the correct directory
cd "${0%/*}" > /dev/null 2>&1
cd ..

# scherzo.crypto
bash src/js/crypto/compile-test.sh

# Indicator of completion
ECHO ""
ECHO "Done!"