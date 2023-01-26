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
