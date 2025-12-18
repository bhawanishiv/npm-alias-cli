import spawn from 'cross-spawn';
import { echoCommand } from './utils';

/**
 * Run an npm command with inherited stdio
 */
export function runNpm(args: string[]): number {
  const cmdStr = `npm ${args.join(' ')}`;
  echoCommand(cmdStr);

  const result = spawn.sync('npm', args, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  return result.status ?? 0;
}

/**
 * Run npm run <script>
 */
export function runScript(script: string, extraArgs: string[] = []): number {
  const args = ['run', script];
  if (extraArgs.length > 0) {
    args.push('--', ...extraArgs);
  }
  return runNpm(args);
}

/**
 * Run npm run lint with --fix --quiet
 */
export function runLint(extraArgs: string[] = []): number {
  const args = ['run', 'lint', '--', '--fix', '--quiet', ...extraArgs];
  return runNpm(args);
}

/**
 * Show help message
 */
export function showHelp(): void {
  console.log(`
n - npm alias CLI

Usage:
  n                     Show this help
  n <script>            npm run <script> (if script is dev, build, start, test)
  n lint                npm run lint -- --fix --quiet
  n r <script>          npm run <script>
  n <cmd> [args]        npm <cmd> [args]

Examples:
  n dev                 npm run dev
  n build               npm run build
  n lint                npm run lint -- --fix --quiet
  n r custom-script     npm run custom-script
  n i lodash            npm install lodash
  n test                npm run test

Tab Completion:
  n completion install    Install shell completion
  n completion uninstall  Remove shell completion
`);
}
