# npm-alias-cli

A lightweight CLI wrapper for npm with shortcuts and tab completion.

## Installation

```bash
npm install -g npm-alias-cli
n completion install
source ~/.zshrc
```

### Custom Alias Name

To use a custom alias (e.g., `np` instead of `n`):

```bash
git clone https://github.com/bhawanishiv/npm-alias-cli.git
cd npm-alias-cli
npm install
./setup.sh np
source ~/.zshrc
```

## Usage

| Command | Description |
|---------|-------------|
| `n` | Show help |
| `n <script>` | `npm run <script>` (for dev, build, start, test) |
| `n lint` | `npm run lint -- --fix --quiet` |
| `n r <script>` | `npm run <script>` (any script) |
| `n <cmd> [args]` | `npm <cmd> [args]` |

## Examples

```bash
# Run scripts
n dev                 # npm run dev
n build               # npm run build
n start               # npm run start
n test                # npm run test

# Lint with auto-fix
n lint                # npm run lint -- --fix --quiet

# Run any script
n r migrate           # npm run migrate
n r custom-script     # npm run custom-script

# npm commands
n i lodash            # npm install lodash
n i -D typescript     # npm install -D typescript
n un lodash           # npm uninstall lodash
n outdated            # npm outdated
```

## Tab Completion

Zsh completions for:
- Known scripts (dev, build, start, test, lint)
- npm commands (install, uninstall, update, etc.)
- Scripts from `package.json` (after `n r`)

```bash
n completion install    # Install completion
n completion uninstall  # Remove completion
```

## License

MIT
