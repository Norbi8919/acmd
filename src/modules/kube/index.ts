import { Command, Option } from 'commander';
import { ModuleConf } from '../../conf';
import { watchableCommand } from '../../utils';
import { getAllPods, getAllNodes, describePod, getPodLogs } from './utils';

export default (command: Command, conf: ModuleConf) => {
  watchableCommand(
    command
      .command('nodes')
      .description('Get all nodes')
      .action((options) =>
        getAllNodes(
          conf,
          options.watch && { delay: options.delay, tail: options.tail }
        )
      )
  );
  watchableCommand(
    command
      .command('pods')
      .description('Get all pods')
      .action((options) =>
        getAllPods(
          conf,
          options.watch && { delay: options.delay, tail: options.tail }
        )
      )
  );
  watchableCommand(
    command
      .command('describe-pod')
      .description('Describe a specific pod')
      .option('-n, --namespace [namespace]', 'the namespace of the pod')
      .argument('<pod-id>', 'the id of the pod to describe')
      .action((podId: string, options: any) =>
        describePod(
          conf,
          options.namespace,
          podId,
          options.watch && { delay: options.delay, tail: options.tail }
        )
      )
  );
  watchableCommand(
    command
      .command('pod-logs')
      .description('Get pod logs')
      .option('-n, --namespace [namespace]', 'the namespace of the pod')
      .argument('<pod-id>', 'the id of the pod to describe')
  ).action((podId: string, options: any) =>
    getPodLogs(
      conf,
      options.namespace,
      podId,
      options.watch && { delay: options.delay, tail: options.tail }
    )
  );
};
