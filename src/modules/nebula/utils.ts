import { ModuleConf } from '../../conf';
import { getInput } from '../../input';
import { execute } from '../../proc';
import chalk from 'chalk';

export const configure = (conf: ModuleConf) => {
  let nebulaPath = execute('which nebula');
  if (!nebulaPath) {
    nebulaPath = getInput('Please enter the path to your nebula binary', true)!;
  } else {
    nebulaPath = getInput('Please enter the path to your nebula binary', false, nebulaPath)!;
  }

  const configPath = getInput('Please enter the path to your nebula config file', true)!;

  conf.set('nebulaPath', nebulaPath);
  conf.set('configPath', configPath);
  
  console.log(chalk.green('Nebula configured'));
};

export const start = (conf: ModuleConf) => {
  if (!conf.get('nebulaPath') || !conf.get('configPath')) {
    console.log(chalk.red('Please run `nebula configure` first.'));
    return;
  }
  
  const cmd = `sudo ${conf.get('nebulaPath')} --config ${conf.get('configPath')};`;
  console.log(chalk.cyanBright('Starting nebula with command:'));
  console.log(cmd);
  console.log(chalk.cyanBright('\nOutput:'));
  execute(cmd, true, true);
};

export const printConfig = (conf: ModuleConf) => {
  console.log(chalk.cyanBright('Nebula config:'));
  console.log(`  - Binary path: ${conf.get('nebulaPath')}`);
  console.log(`  - Config path: ${conf.get('configPath')}`);
};