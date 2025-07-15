import type { Edge, Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from '../../nodes';

export interface CreateNodeProps {
  nodeType: FLOW_NODE_TYPE_KEY;
  id: string;
  parentId?: string;
}

export interface AddNodeProps {
  nodeType: FLOW_NODE_TYPE_KEY;
  oldNodes: Node[];
  oldEdges: Edge[];
  // data?: WorkflowPanelState['data'];

  data?: any;
}
