import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';

export type FlowNodeLoopContainerPropsData = Record<string, unknown>;

export type FlowNodeLoopContainer = Node<
  FlowNodeLoopContainerPropsData,
  FLOW_NODE_TYPE_KEY.LOOP_CONTAINER
>;
