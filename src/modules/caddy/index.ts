import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { configure, start, stop, printConfig } from './utils';

export default (command: Command, conf: ModuleConf) => {
  command
    .command('configure')
    .description('Configure caddy')
    .action(() => configure(conf));
  command
    .command('start')
    .description('Start caddy')
    .action(() => start(conf));
  command
    .command('stop')
    .description('Stop caddy')
    .action(() => stop(conf));
  command
    .command('print')
    .description('Print caddy config')
    .action(() => printConfig(conf));
};
