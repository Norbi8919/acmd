import { Command } from 'commander';
import { moduleConf } from '../conf';
import { Module } from '../types';

import nebula from './nebula';
import caddy from './caddy';
import kube from './kube';
import ffmpeg from './ffmpeg';

const modules: { [key in string]: Module } = {
  nebula,
  caddy,
  kube,
  ffmpeg,
};

const constructModule = (
  program: Command,
  name: string,
  initFunc: Function
) => {
  const conf = moduleConf(name);
  const command = new Command(name);
  initFunc(command, conf);
  program.addCommand(command);
};

export default (program: Command) => {
  Object.entries(modules).forEach(([name, initFunc]) =>
    constructModule(program, name, initFunc)
  );
};
