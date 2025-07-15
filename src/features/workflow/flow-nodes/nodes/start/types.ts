import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';

export type FlowNodeStartPropsData = {
  goal: string;
  ip_region: string;
  ip_type: string;
};

export type FlowNodeStart = Node<
  FlowNodeStartPropsData,
  FLOW_NODE_TYPE_KEY.START
>;
