#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import { Command } from 'commander';
import initModules from './modules';

const program = new Command();

program.addHelpText(
  'before',
  `${chalk.red(
    figlet.textSync('acmd', { font: 'Larry 3D 2', horizontalLayout: 'full' })
  )}
${chalk.cyan(
  "Ash's CMD Tool"
)} - A bunch of utilities that will probably be of no interest to anyone but Ash.
`
);

initModules(program);

try {
  program.parse();
} catch (e) {
  console.log(chalk.red(e));
  process.exit(1);
}
