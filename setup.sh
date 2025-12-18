#!/bin/bash

ALIAS_NAME="${1:-n}"

echo "Setting up npm-alias-cli with alias: $ALIAS_NAME"

# Update package.json bin field
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.bin = { '$ALIAS_NAME': './bin/n.js' };
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

npm run build
npm link
$ALIAS_NAME completion install

echo ""
echo "Done! Run: source ~/.zshrc"
