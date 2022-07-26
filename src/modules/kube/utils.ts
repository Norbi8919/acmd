import chalk from 'chalk';
import { ModuleConf } from '../../conf';
import { execute, WatchOptions } from '../../proc';

export const getAllNodes = (conf: ModuleConf, watchOpts?: WatchOptions) => {
  const cmd = 'kubectl get nodes --all-namespaces';
  console.log(chalk.bold('Getting all nodes...'));
  execute(cmd, { showOutput: true, printCommand: true }, watchOpts);
};

export const getAllPods = (conf: ModuleConf, watchOpts?: WatchOptions) => {
  const cmd = `kubectl get pods -A \
--field-selector=metadata.namespace!=kube-system`;
  console.log(chalk.bold('Getting all nodes...'));
  execute(cmd, { showOutput: true, printCommand: true }, watchOpts);
};

export const describePod = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string,
  watchOpts?: WatchOptions
) => {
  let cmd = `kubectl describe pod ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }
  console.log(chalk.bold('Describing pod...'));
  execute(cmd, { showOutput: true, printCommand: true }, watchOpts);
};

export const getPodLogs = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string,
  watchOpts?: WatchOptions
) => {
  let cmd = `kubectl logs ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }
  console.log(chalk.bold('Getting pod logs...'));
  execute(cmd, { showOutput: true, printCommand: true }, watchOpts);
};

export const getLatestPod = (
  conf: ModuleConf,
  namespace: string | undefined,
  quiet: boolean | undefined
) => {
  let cmd = `kubectl get pod --sort-by=.metadata.creationTimestamp -o name --all-namespaces`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }
  // Keep only the last pod and trim the prefix of "pod/"
  cmd = `${cmd} | tail -n 1 | cut -c 5-`;
  if (!quiet) {
    console.log(chalk.bold('Getting latest pod...'));
  }
  execute(cmd, { showOutput: true, printCommand: !quiet, quiet });
};
