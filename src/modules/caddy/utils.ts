import { ModuleConf } from '../../conf';
import { getInput } from '../../input';
import { execute } from '../../proc';
import chalk from 'chalk';

export const configure = (conf: ModuleConf) => {
  let caddyPath = execute('which caddy');
  if (!caddyPath) {
    caddyPath = getInput('Please enter the path to your Caddy binary', true)!;
  } else {
    caddyPath = getInput(
      'Please enter the path to your Caddy binary',
      false,
      caddyPath
    )!;
  }

  let caddyfilePath = conf.get('caddyfilePath') as string | undefined;
  if (!caddyfilePath) {
    caddyfilePath = getInput('Please enter the path to your Caddyfile', true)!;
  } else {
    caddyfilePath = getInput(
      'Please enter the path to your Caddyfile',
      false,
      caddyfilePath
    )!;
  }

  conf.set('caddyPath', caddyPath);
  conf.set('caddyfilePath', caddyfilePath);

  console.log(chalk.green('Caddy configured'));
};

export const start = (conf: ModuleConf) => {
  if (!conf.get('caddyPath') || !conf.get('caddyfilePath')) {
    console.log(chalk.red('Please run `caddy configure` first.'));
    return;
  }

  const cmd = `sudo ${conf.get(
    'caddyPath'
  )} start --adapter caddyfile --config ${conf.get('caddyfilePath')}`;
  console.log(chalk.bold('Starting Caddy...'));
  execute(cmd, { showOutput: true, printCommand: true });
  
};

export const stop = (conf: ModuleConf) => {
  if (!conf.get('caddyPath') || !conf.get('caddyfilePath')) {
    console.log(chalk.red('Please run `caddy configure` first.'));
    return;
  }

  const cmd = `sudo ${conf.get('caddyPath')} stop`;
  console.log(chalk.bold('Stopping Caddy...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const printConfig = (conf: ModuleConf) => {
  console.log(chalk.bold('Caddy config:'));
  console.log(`  - Binary path: ${conf.get('caddyPath')}`);
  console.log(`  - Config path: ${conf.get('caddyfilePath')}`);
};
