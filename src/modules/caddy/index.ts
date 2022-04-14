import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { configure, start, stop, printConfig } from './utils';

export default (command: Command, conf: ModuleConf) => {
  command
    .command('configure')
    .description('Configure Caddy')
    .action(() => configure(conf));
  command
    .command('start')
    .description('Start Caddy')
    .action(() => start(conf));
  command
    .command('stop')
    .description('Stop Caddy')
    .action(() => stop(conf));
  command
    .command('print')
    .description('Print Caddy config')
    .action(() => printConfig(conf));
};
