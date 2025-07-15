import { IN_ABNORMAL_ACTION_TYPE_KEY } from './types';

export const inAbnormalActionOptions = [
  {
    label: 'Stop task',
    value: IN_ABNORMAL_ACTION_TYPE_KEY.STOP_TASK,
  },
  {
    label: 'Ignore this node and continue execution',
    value: IN_ABNORMAL_ACTION_TYPE_KEY.IGNORE_AND_CONTINUE,
  },
];
