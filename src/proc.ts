import chalk from 'chalk';
import { execSync } from 'child_process';
import { combineObjects } from './utils';

export interface ExecuteOptions {
  showOutput?: boolean;
  suppressError?: boolean;
  printCommand?: boolean;
  quiet?: boolean;
}
const defaultExecOptions: ExecuteOptions = {
  showOutput: false,
  suppressError: true,
  printCommand: false,
};
export interface WatchOptions {
  tail?: number | undefined;
  delay?: number | undefined;
}
const defaultWatchOptions: WatchOptions = {
  tail: undefined,
  delay: 1,
};

export const execute = (
  command: string,
  execOptions: ExecuteOptions = defaultExecOptions,
  watchOptions?: WatchOptions
) => {
  const execOpts = combineObjects(defaultExecOptions, execOptions);

  if (execOpts.printCommand) {
    const msg = `${chalk.cyanBright('Executing command:')}\n${command}`;
    console.log(msg);
  }
  let cmd = command;

  if (watchOptions) {
    const watchOpts = combineObjects(defaultWatchOptions, watchOptions);
    cmd = watchCmd(command, watchOpts);
  }
  try {
    if (execOpts.showOutput && !watchOptions && !execOpts.quiet) {
      console.log(chalk.cyanBright('\nOutput:'));
    }
    const output = execSync(cmd, {
      stdio: execOpts.showOutput ? 'inherit' : 'pipe',
      encoding: 'utf8',
    });

    if (output) return output.toString().trim();
    return output;
  } catch (e) {
    if (!execOpts.suppressError) {
      throw e;
    }
  }
};

const watchCmd = (command: string, watchOptions: WatchOptions) => {
  const watchOpts = combineObjects(defaultWatchOptions, watchOptions);
  let cmd = `watch -n ${watchOpts.delay} "${command}";`;
  if (watchOpts.tail) {
    cmd = `watch -n ${watchOpts.delay} "${command} | tail -n ${watchOpts.tail}";`;
  }
  return cmd;
};
