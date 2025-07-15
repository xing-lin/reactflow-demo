import type { Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../../widgets';

export type FlowNodeFinishOutputDataPropsData = {
  output_type: OUTPUT_TYPE_KEY;
  inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY;
};

export type FlowNodeFinishOutputData = Node<
  FlowNodeFinishOutputDataPropsData,
  FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA
>;

export const enum OUTPUT_TYPE_KEY {
  TEXT = 'text',
  EXCEL_XLSX = 'excel',
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  MD = 'markdown',
}
