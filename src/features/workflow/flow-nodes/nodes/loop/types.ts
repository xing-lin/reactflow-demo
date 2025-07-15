import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';

export type FlowNodeLoopPropsData = {
  goal: string;
  limit: number;
};

export type FlowNodeLoop = Node<FlowNodeLoopPropsData, FLOW_NODE_TYPE_KEY.LOOP>;
