import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeClickElementPropsData = {
  goal: string;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeClickElement = Node<
  FlowNodeClickElementPropsData,
  FLOW_NODE_TYPE_KEY.CLICK_ELEMENT
>;
