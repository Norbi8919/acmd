import chalk from 'chalk';
import { ModuleConf } from '../../conf';
import { execute, watch } from '../../proc';

export const getAllNodes = (conf: ModuleConf) => {
  const cmd = 'kubectl get nodes --all-namespaces;';
  console.log(chalk.bold('Getting all nodes...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const watchAllNodes = (conf: ModuleConf, delay: number) => {
  const cmd = 'kubectl get nodes --all-namespaces;';
  console.log(chalk.bold('Watching all nodes...'));
  watch(cmd, { showOutput: true, printCommand: true }, { delay });
};

export const getAllPods = (conf: ModuleConf) => {
  const cmd = `kubectl get pods -A \
--field-selector=metadata.namespace!=kube-system;`;
  console.log(chalk.bold('Getting all nodes...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const watchAllPods = (conf: ModuleConf, delay: number) => {
  const cmd = `kubectl get pods -A \
--field-selector=metadata.namespace!=kube-system;`;
  console.log(chalk.bold('Watching all nodes...'));
  watch(cmd, { showOutput: true, printCommand: true }, { delay });
};

export const describePod = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string
) => {
  let cmd = `kubectl describe pod ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }
  console.log(chalk.bold('Describing pod...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const watchDescribePod = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string,
  tail: number,
  delay: number
) => {
  let cmd = `kubectl describe pod ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }

  watch(cmd, { showOutput: true, printCommand: true }, { tail, delay });
};

export const getPodLogs = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string
) => {
  let cmd = `kubectl logs ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }
  console.log(chalk.bold('Getting pod logs...'));
  execute(cmd, { showOutput: true, printCommand: true });
};

export const watchPodLogs = (
  conf: ModuleConf,
  namespace: string | undefined,
  podId: string,
  tail: number,
  delay: number
) => {
  let cmd = `kubectl logs ${podId}`;
  if (namespace) {
    cmd = `${cmd} --namespace ${namespace}`;
  }

  watch(cmd, { showOutput: true, printCommand: true }, { tail, delay });
};
