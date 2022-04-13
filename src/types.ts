import { Command } from "commander";
import { ModuleConf } from "./conf";

export interface Module {
  (command: Command, conf: ModuleConf): void;
};
