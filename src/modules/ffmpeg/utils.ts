import { IChangeFrameRateOptions, IRotateOptions, ITrimOptions } from '.';
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
    `"${input}"`,
    ...(start ? ['-ss', start] : []),
    ...(end ? ['-to', end] : []),
    `"${output}"`,
  ];
  const cmd = cmdParts.join(' ');

  execute(cmd, { showOutput: true, printCommand: true });
};

export const rotate = (
  conf: ModuleConf,
  input: string,
  options: IRotateOptions
) => {
  const { 90: _90, 180: _180, 270: _270 } = options;
  let { output } = options;

  if ([_90, _180, _270].filter((r) => r).length !== 1) {
    throw new Error('You must specify precisely one rotation');
  }
  if (!output) {
    const inputParts = input.split('.');
    const noExt = inputParts.slice(0, inputParts.length - 1).join('.');
    output = `"${noExt}-rotated.mp4"`;
  }

  let transposeStr = '';
  if (_90) {
    transposeStr = 'transpose=1';
  } else if (_180) {
    transposeStr = 'transpose=1,transpose=1';
  } else if (_270) {
    transposeStr = 'transpose=2';
  }

  const cmdParts = [
    'ffmpeg',
    '-i',
    `"${input}"`,
    '-vf',
    transposeStr,
    `"${output}"`,
  ];
  const cmd = cmdParts.join(' ');

  execute(cmd, { showOutput: true, printCommand: true });
};

export const changeFrameRate = (
  conf: ModuleConf,
  input: string,
  options: IChangeFrameRateOptions
) => {
  const { fps } = options;
  let { output } = options;

  if (!fps) {
    throw new Error('You must specify a new frame rate');
  }
  if (fps <= 0) {
    throw new Error('The new frame rate must be greater than zero');
  }
  if (!output) {
    const inputParts = input.split('.');
    const noExt = inputParts.slice(0, inputParts.length - 1).join('.');
    output = `"${noExt}-${fps}fps.mp4"`;
  }

  const cmdParts = [
    'ffmpeg',
    '-i',
    `"${input}"`,
    '-vf',
    `fps=${fps}`,
    `"${output}"`,
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
