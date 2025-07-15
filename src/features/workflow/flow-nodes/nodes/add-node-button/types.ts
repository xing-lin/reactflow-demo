import { type Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';

export type FlowNodeAddNodeButtonPropsData = Record<string, unknown>;

export type FlowNodeAddNodeButton = Node<
  FlowNodeAddNodeButtonPropsData,
  FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON
>;
