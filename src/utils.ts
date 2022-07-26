import { Command } from 'commander';

export const combineObjects = (a: any, b: any) => {
  // Combine both objects, not allowing any undefineds in b to override a
  const out: any = {};
  Object.entries(a).forEach(([key, value]) => {
    out[key] = value;
  });
  Object.entries(b).forEach(([key, value]) => {
    if (value !== undefined) {
      out[key] = value;
    }
  });
  return out;
};

export const isEmptyObj = (a: any) => {
  // Returns true if all the values in the object are undefined
  return Object.values(a).every((value) => value === undefined);
};

export const watchableCommand = (command: Command) => {
  return command
    .option('--watch', 'if true, watch the output')
    .option('-d, --delay [seconds]', 'the delay between watching')
    .option('-t, --tail [lines]', 'number of lines to tail');
};

export const quietableCommand = (command: Command) => {
  return command.option('-q, --quiet', 'if provided, only print output');
};
