import { Command, Option } from 'commander';
import { ModuleConf } from '../../conf';
import {
  getAllPods,
  watchAllPods,
  getAllNodes,
  watchAllNodes,
  describePod,
  watchDescribePod,
  getPodLogs,
  watchPodLogs,
} from './utils';

export default (command: Command, conf: ModuleConf) => {
  command
    .command('nodes')
    .description('Get all nodes')
    .action(() => getAllNodes(conf));
  command
    .command('watch-nodes')
    .description('Watch all nodes')
    .option('-d, --delay [seconds]', 'the delay between watching')
    .action((options: any) => watchAllNodes(conf, options.delay));
  command
    .command('pods')
    .description('Get all pods')
    .action(() => getAllPods(conf));
  command
    .command('watch-pods')
    .description('Watch all pods')
    .option('-d, --delay [seconds]', 'the delay between watching')
    .action((options: any) => watchAllPods(conf, options.delay));
  command
    .command('describe-pod')
    .description('Describe a specific pod')
    .option('-n, --namespace [namespace]', 'the namespace of the pod')
    .argument('<pod-id>', 'the id of the pod to describe')
    .action((podId: string, options: any) =>
      describePod(conf, options.namespace, podId)
    );
  command
    .command('watch-describe-pod')
    .description('Watch describe a specific pod')
    .option('-d, --delay [seconds]', 'the delay between watching')
    .option('-n, --namespace [namespace]', 'the namespace of the pod')
    .option('-t, --tail [lines]', 'number of lines to tail')
    .argument('<pod-id>', 'the id of the pod to describe')
    .action((podId: string, options: any) =>
      watchDescribePod(
        conf,
        options.namespace,
        podId,
        options.tail,
        options.delay
      )
    );
  command
    .command('pod-logs')
    .description('Get pod logs')
    .option('-n, --namespace [namespace]', 'the namespace of the pod')
    .argument('<pod-id>', 'the id of the pod to describe')
    .action((podId: string, options: any) =>
      getPodLogs(conf, options.namespace, podId)
    );
  command
    .command('watch-pod-logs')
    .description('Watch pod logs')
    .option('-d, --delay [seconds]', 'the delay between watching')
    .option('-n, --namespace [namespace]', 'the namespace of the pod')
    .option('-t, --tail [lines]', 'number of lines to tail')
    .argument('<pod-id>', 'the id of the pod to describe')
    .action((podId: string, options: any) =>
      watchPodLogs(conf, options.namespace, podId, options.tail, options.delay)
    );
};
