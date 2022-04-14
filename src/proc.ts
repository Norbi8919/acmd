import chalk from 'chalk';
import { execSync } from 'child_process';
import { combineObjects } from './utils';

interface ExecuteOptions {
  showOutput?: boolean;
  suppressError?: boolean;
  printCommand?: boolean;
}
const defaultExecOptions: ExecuteOptions = {
  showOutput: false,
  suppressError: true,
  printCommand: false,
};

export const execute = (
  command: string,
  options: ExecuteOptions = defaultExecOptions
) => {
  const opts = combineObjects(defaultExecOptions, options);

  if (opts.printCommand) {
    const msg = `${chalk.cyanBright('Executing command:')}\n${command}`;
    console.log(msg);
  }

  try {
    if (opts.showOutput) {
      console.log(chalk.cyanBright('\nOutput:'));
    }
    const output = execSync(command, {
      stdio: opts.showOutput ? 'inherit' : 'pipe',
      encoding: 'utf8',
    });

    if (output) return output.toString().trim();
    return output;
  } catch (e) {
    if (!opts.suppressError) {
      throw e;
    }
  }
};

interface WatchOptions {
  tail?: number | undefined;
  delay?: number | undefined;
}
const defaultWatchOptions: WatchOptions = {
  tail: undefined,
  delay: 1,
};
export const watch = (
  command: string,
  execOptions: ExecuteOptions = defaultExecOptions,
  watchOptions: WatchOptions = defaultWatchOptions
) => {
  const watchOpts = combineObjects(defaultWatchOptions, watchOptions);
  let cmd = `watch -n ${watchOpts.delay} "${command}";`;
  if (watchOpts.tail) {
    cmd = `watch -n ${watchOpts.delay} "${command} | tail -n ${watchOpts.tail}";`;
  }

  return execute(cmd, execOptions);
};
