import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeVisitPagePropsData = {
  goal: string;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeVisitPage = Node<
  FlowNodeVisitPagePropsData,
  FLOW_NODE_TYPE_KEY.VISIT_PAGE
>;
