import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { trim } from './utils';

export interface ITrimOptions {
  start?: string;
  end?: string;
  output: string;
}

export default (command: Command, conf: ModuleConf) => {
  command
    .command('trim')
    .description('Trim a video file')
    .argument('<input>', 'the path to the input video file')
    .option('-s, --start [time]', 'the start time of the video')
    .option('-e, --end [time]', 'the end time of the video')
    .option('-o, --output [path]', 'the path to the output video file')
    .action((inputPath: string, options: ITrimOptions) =>
      trim(conf, inputPath, options)
    );
};
