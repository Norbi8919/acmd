import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { configure, start, printConfig } from './utils';

export default (command: Command, conf: ModuleConf) => {
  command
    .command('configure')
    .description('Configure nebula')
    .action(() => configure(conf));
  command
    .command('start')
    .description('Start nebula')
    .action(() => start(conf));
  command
    .command('print')
    .description('Print nebula config')
    .action(() => printConfig(conf));
};
