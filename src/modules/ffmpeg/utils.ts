import { ITrimOptions } from '.';
import { ModuleConf } from '../../conf';
import { execute } from '../../proc';

export const trim = (
  conf: ModuleConf,
  input: string,
  options: ITrimOptions
) => {
  const { start, end } = options;
  let { output } = options;
  if (!start && !end) {
    throw new Error('You must specify a start and/or end time');
  }
  if (!output) {
    const inputParts = input.split('.');
    const noExt = inputParts.slice(0, inputParts.length - 1).join('.');
    output = `${noExt}-trimmed.mp4`;
  }

  const cmdParts = [
    'ffmpeg',
    '-i',
    input,
    ...(start ? ['-ss', start] : []),
    ...(end ? ['-to', end] : []),
    output,
  ];
  const cmd = cmdParts.join(' ');

  execute(cmd, { showOutput: true, printCommand: true });
};

export const countFrames = (conf: ModuleConf, input: string) => {
  // ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0
  const cmdParts = [
    'ffprobe',
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-count_packets',
    '-show_entries',
    'stream=nb_read_packets',
    '-of',
    'csv=p=0',
    input,
  ];
  const cmd = cmdParts.join(' ');

  execute(cmd, { showOutput: true, printCommand: true });
};
