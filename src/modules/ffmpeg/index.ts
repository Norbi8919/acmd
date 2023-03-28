import { Command } from 'commander';
import { ModuleConf } from '../../conf';
import { countFrames, trim, rotate } from './utils';

export interface ITrimOptions {
  start?: string;
  end?: string;
  output: string;
}

export interface IRotateOptions {
  '90'?: boolean;
  '180'?: boolean;
  '270'?: boolean;
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
  command
    .command('rotate')
    .description('Rotate a video file (clockwise)')
    .argument('<input>', 'the path to the input video file')
    .option('-90 --90', 'rotate 90 degrees')
    .option('-180 --180', 'rotate 180 degrees')
    .option('-270 --270', 'rotate 270 degrees')
    .option('-o, --output [path]', 'the path to the output video file')
    .action((inputPath: string, options: IRotateOptions) =>
      rotate(conf, inputPath, options)
    );
  command
    .command('count-frames')
    .description('Count the number of frames in a video file')
    .argument('<input>', 'the path to the input video file')
    .action((inputPath: string) => countFrames(conf, inputPath));
};
