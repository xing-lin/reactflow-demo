import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeScrollPagePropsData = {
  goal: string;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeScrollPage = Node<
  FlowNodeScrollPagePropsData,
  FLOW_NODE_TYPE_KEY.SCROLL_PAGE
>;
