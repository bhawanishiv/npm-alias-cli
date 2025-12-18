import * as fs from 'fs';
import * as path from 'path';

// Known scripts that map to `npm run <script>`
export const KNOWN_SCRIPTS: string[] = ['dev', 'build', 'start', 'test', 'lint'];

// Common npm commands for completion
export const NPM_COMMANDS: string[] = [
  'access', 'adduser', 'audit', 'bin', 'bugs', 'cache', 'ci', 'completion',
  'config', 'dedupe', 'deprecate', 'diff', 'dist-tag', 'docs', 'doctor',
  'edit', 'exec', 'explain', 'explore', 'find-dupes', 'fund', 'get',
  'help', 'hook', 'init', 'install', 'install-ci-test', 'install-test',
  'link', 'login', 'logout', 'ls', 'org', 'outdated', 'owner', 'pack',
  'ping', 'pkg', 'prefix', 'profile', 'prune', 'publish', 'query',
  'rebuild', 'repo', 'restart', 'root', 'run', 'run-script', 'search',
  'set', 'shrinkwrap', 'star', 'stars', 'start', 'stop', 'team', 'test',
  'token', 'uninstall', 'unpublish', 'unstar', 'update', 'version', 'view',
  'whoami'
];

// Short aliases for common npm commands
export const NPM_ALIASES: Record<string, string> = {
  'i': 'install',
  'it': 'install-test',
  'cit': 'install-ci-test',
  'un': 'uninstall',
  'up': 'update',
  'ln': 'link',
  't': 'test',
  'tst': 'test',
  's': 'search',
  'se': 'search',
  'r': 'run',
  'rb': 'rebuild',
  'c': 'config',
  'ddp': 'dedupe'
};

interface PackageJson {
  scripts?: Record<string, string>;
}

/**
 * Get npm scripts from package.json in the current directory
 */
export function getPackageScripts(): string[] {
  try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      return Object.keys(pkg.scripts || {});
    }
  } catch {
    // Ignore errors
  }
  return [];
}

/**
 * Check if a command is a known script
 */
export function isKnownScript(cmd: string): boolean {
  return KNOWN_SCRIPTS.includes(cmd);
}

/**
 * Print the command being executed
 */
export function echoCommand(cmd: string): void {
  console.log(`> ${cmd}`);
}
