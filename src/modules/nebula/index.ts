import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { configure, start, printConfig } from './utils';

export default (command: Command, conf: ModuleConf) => {
  command
    .command('configure')
    .description('Configure Nebula')
    .action(() => configure(conf));
  command
    .command('start')
    .description('Start Nebula')
    .action(() => start(conf));
  command
    .command('print')
    .description('Print Nebula config')
    .action(() => printConfig(conf));
};
