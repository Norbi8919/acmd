import chalk from 'chalk';
import readline from 'readline-sync';

export const getInput = (
  prompt: string,
  required: boolean = true,
  defaultVal: string | undefined = undefined
): string | undefined => {
  if (required && defaultVal) {
    throw new Error('Cannot set default value and require input');
  }

  let response: string | undefined;
  const promptStr = defaultVal ? `${prompt} (${defaultVal}): ` : `${prompt}: `;
  do {
    response = readline.question(promptStr) || defaultVal;
    if (required && !response) {
      console.log(chalk.red('Please enter a value.'));
    }
  } while (required && !response);
  return response;
};
