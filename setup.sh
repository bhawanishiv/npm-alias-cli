#!/bin/bash

ALIAS_NAME="${1:-n}"

echo "Setting up npm-alias-cli with alias: $ALIAS_NAME"

# Update package.json bin field
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.bin = { '$ALIAS_NAME': './bin/n.js' };
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('Updated package.json bin to: $ALIAS_NAME');
"

# Update completion script
node -e "
const fs = require('fs');
let content = fs.readFileSync('src/completion.ts', 'utf8');
content = content.replace(/_n_cli_completion/g, '_${ALIAS_NAME}_cli_completion');
content = content.replace(/compdef _${ALIAS_NAME}_cli_completion n/g, 'compdef _${ALIAS_NAME}_cli_completion $ALIAS_NAME');
content = content.replace(/\.n-completion\.zsh/g, '.$ALIAS_NAME-completion.zsh');
fs.writeFileSync('src/completion.ts', content);
console.log('Updated completion.ts');
"

# Build
echo "Building..."
npm run build

# Unlink previous if exists
npm unlink -g npm-alias-cli 2>/dev/null || true

# Link globally
echo "Linking globally..."
npm link

# Install completion
echo "Installing completion..."
$ALIAS_NAME completion install

echo ""
echo "Setup complete! Run: source ~/.zshrc"
echo "Then use '$ALIAS_NAME' as your npm alias"
