import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const COMPLETION_SCRIPT = `
###-begin-n-completion-###
_n_cli_completion() {
  local -a completions scripts npm_commands known_scripts

  known_scripts=("dev:npm run dev" "build:npm run build" "start:npm run start" "test:npm run test" "lint:npm run lint -- --fix --quiet")

  npm_commands=(
    "i:install packages" "install:install packages" "uninstall:remove packages"
    "update:update packages" "run:run scripts" "init:create package.json"
    "publish:publish package" "link:symlink package" "ls:list packages"
    "outdated:check outdated" "audit:security audit" "cache:manage cache"
    "config:manage config" "help:get help" "version:bump version"
  )

  case $CURRENT in
    2)
      completions=("r:run any npm script" "completion:manage completion" $known_scripts $npm_commands)
      _describe 'n command' completions
      ;;
    3)
      case \${words[2]} in
        r)
          if [[ -f package.json ]]; then
            scripts=(\${(f)"\$(node -e "try{const p=require('./package.json');if(p.scripts)console.log(Object.keys(p.scripts).join('\\n'))}catch(e){}" 2>/dev/null)"})
            _describe 'npm script' scripts
          fi
          ;;
        completion)
          _describe 'action' '("install:install completion" "uninstall:remove completion")'
          ;;
        *) _normal ;;
      esac
      ;;
    *) _normal ;;
  esac
}
compdef _n_cli_completion n
###-end-n-completion-###
`.trim();

/**
 * Get the completion file path
 */
export function getCompletionFilePath(): string {
  return path.join(os.homedir(), '.n-completion.zsh');
}

/**
 * Print the zsh completion script
 */
export function printCompletionScript(): void {
  console.log(COMPLETION_SCRIPT);
}

/**
 * Install shell completion
 */
export function installCompletion(): void {
  const completionFile = getCompletionFilePath();
  const zshrcPath = path.join(os.homedir(), '.zshrc');

  // Write completion file
  fs.writeFileSync(completionFile, COMPLETION_SCRIPT + '\n');
  console.log(`Completion script written to: ${completionFile}`);

  // Check if already sourced in .zshrc
  const zshrc = fs.readFileSync(zshrcPath, 'utf8');
  const sourceCmd = `[ -f ~/.n-completion.zsh ] && source ~/.n-completion.zsh`;

  if (!zshrc.includes('.n-completion.zsh')) {
    fs.appendFileSync(zshrcPath, `\n# n CLI completion\n${sourceCmd}\n`);
    console.log('Added source command to ~/.zshrc');
  }

  console.log('\nCompletion installed! Run: source ~/.zshrc');
}

/**
 * Uninstall shell completion
 */
export function uninstallCompletion(): void {
  const completionFile = getCompletionFilePath();
  const zshrcPath = path.join(os.homedir(), '.zshrc');

  // Remove completion file
  if (fs.existsSync(completionFile)) {
    fs.unlinkSync(completionFile);
    console.log(`Removed: ${completionFile}`);
  }

  // Remove from .zshrc
  if (fs.existsSync(zshrcPath)) {
    let zshrc = fs.readFileSync(zshrcPath, 'utf8');
    zshrc = zshrc.replace(
      /\n# n CLI completion\n\[ -f ~\/.n-completion\.zsh \] && source ~\/.n-completion\.zsh\n?/g,
      ''
    );
    fs.writeFileSync(zshrcPath, zshrc);
    console.log('Removed source command from ~/.zshrc');
  }

  console.log('\nCompletion uninstalled!');
}
