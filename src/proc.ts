import chalk from 'chalk';
import { execSync } from 'child_process';

interface ExecuteOptions {
  showOutput?: boolean;
  suppressError?: boolean;
  printCommand?: boolean;
}
const defaultOptions: ExecuteOptions = {
  showOutput: false,
  suppressError: true,
  printCommand: false,
};

export const execute = (
  command: string,
  options: ExecuteOptions = defaultOptions
) => {
  const opts = { ...defaultOptions, ...options };

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
