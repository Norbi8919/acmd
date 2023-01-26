import { ModuleConf } from '../../conf';
import { getInput } from '../../input';
import { execute } from '../../proc';
import chalk from 'chalk';

export const configure = (conf: ModuleConf) => {
  let nebulaPath = execute('which nebula');
  if (!nebulaPath) {
    nebulaPath = getInput('Please enter the path to your Nebula binary', true)!;
  } else {
    nebulaPath = getInput(
      'Please enter the path to your Nebula binary',
      false,
      nebulaPath
    )!;
  }

  const configPath = getInput(
    'Please enter the path to your Nebula config file',
    true
  )!;

  conf.set('nebulaPath', nebulaPath);
  conf.set('configPath', configPath);

  console.log(chalk.green('Nebula configured'));
};

export const start = (conf: ModuleConf) => {
  if (!conf.get('nebulaPath') || !conf.get('configPath')) {
    throw new Error(chalk.red('Please run `nebula configure` first.'));
  }

  const cmd = `sudo ${conf.get('nebulaPath')} --config ${conf.get(
    'configPath'
  )};`;
  console.log(chalk.bold('Starting Nebula...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const printConfig = (conf: ModuleConf) => {
  console.log(chalk.bold('Nebula config:'));
  console.log(`  - Binary path: ${conf.get('nebulaPath')}`);
  console.log(`  - Config path: ${conf.get('configPath')}`);
};
