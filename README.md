# n - npm alias CLI

A lightweight CLI wrapper for npm with shortcuts and tab completion.

## Installation

```bash
git clone git@github.com:bhawanishiv/npm-alias-cli.git
cd npm-alias-cli
npm install
npm run build
npm link
```

### Enable Tab Completion

```bash
n completion install
source ~/.zshrc
```

## Usage

```bash
n                     # Show help
n <script>            # npm run <script> (for known scripts)
n r <script>          # npm run <script> (any script)
n <cmd> [args]        # npm <cmd> [args]
```

## Examples

### Run Scripts

```bash
n dev                 # npm run dev
n build               # npm run build
n start               # npm run start
n test                # npm run test
```

### Special Lint Command

```bash
n lint                # npm run lint -- --fix --quiet
n lint src/           # npm run lint -- --fix --quiet src/
```

### Run Any Script

```bash
n r custom-script     # npm run custom-script
n r migrate           # npm run migrate
```

### npm Commands

```bash
n i lodash            # npm install lodash
n i -D typescript     # npm install -D typescript
n un lodash           # npm uninstall lodash
n outdated            # npm outdated
n ls                  # npm ls
n init                # npm init
```

## Known Scripts

These scripts are automatically mapped to `npm run`:

- `dev`
- `build`
- `start`
- `test`
- `lint` (with `--fix --quiet`)

## Tab Completion

Supports zsh with completions for:

- Known scripts (dev, build, start, test, lint)
- npm commands (install, uninstall, update, etc.)
- Scripts from `package.json` (after `n r`)

### Manage Completion

```bash
n completion install    # Install shell completion
n completion uninstall  # Remove shell completion
n completion --zsh      # Print completion script
```

## Development

```bash
npm run build    # Compile TypeScript
npm run dev      # Watch mode
```

## License

MIT
