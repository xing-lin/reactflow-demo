import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeExtractDataPropsData = {
  filter: string;
  goal: string;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeExtractData = Node<
  FlowNodeExtractDataPropsData,
  FLOW_NODE_TYPE_KEY.EXTRACT_DATA
>;
