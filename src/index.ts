import { isKnownScript } from './utils';
import { runNpm, runScript, runLint, showHelp } from './commands';
import { installCompletion, uninstallCompletion, printCompletionScript } from './completion';

// Get arguments (skip node and script path)
const args = process.argv.slice(2);

// No arguments - show help
if (args.length === 0) {
  showHelp();
  process.exit(0);
}

const firstArg = args[0];
const restArgs = args.slice(1);

// Handle completion management
if (firstArg === 'completion') {
  const action = restArgs[0];
  if (action === 'install') {
    installCompletion();
  } else if (action === 'uninstall') {
    uninstallCompletion();
  } else if (action === '--zsh' || action === 'zsh') {
    printCompletionScript();
  } else {
    console.log('Usage: n completion [install|uninstall|--zsh]');
    process.exit(1);
  }
  process.exit(0);
}

// Handle 'r' shorthand for run
if (firstArg === 'r') {
  if (restArgs.length === 0) {
    // Just show available scripts
    const exitCode = runNpm(['run']);
    process.exit(exitCode);
  } else {
    const script = restArgs[0];
    const scriptArgs = restArgs.slice(1);
    const exitCode = runScript(script, scriptArgs);
    process.exit(exitCode);
  }
}

// Handle special lint case
if (firstArg === 'lint') {
  const exitCode = runLint(restArgs);
  process.exit(exitCode);
}

// Handle known scripts
if (isKnownScript(firstArg)) {
  const exitCode = runScript(firstArg, restArgs);
  process.exit(exitCode);
}

// Default: pass through to npm
const exitCode = runNpm(args);
process.exit(exitCode);
