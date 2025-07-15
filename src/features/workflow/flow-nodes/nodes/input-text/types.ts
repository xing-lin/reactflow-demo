import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeInputTextPropsData = {
  goal: string;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeInputText = Node<
  FlowNodeInputTextPropsData,
  FLOW_NODE_TYPE_KEY.INPUT_TEXT
>;
