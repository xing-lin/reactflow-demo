import { type Edge, type Node } from '@xyflow/react';
import { FLOW_EDGE_TYPE_KEY, FLOW_NODE_TYPE_KEY } from './flow-nodes';

export const initialNodes: Node[] = [
  {
    id: '0',
    type: FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
  },
  {
    id: '1',
    type: FLOW_NODE_TYPE_KEY.START,
  },
  {
    id: '-1',
    type: FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON,
  },
].map((item) => {
  return {
    ...item,
    data: {},
    position: { x: 0, y: 0 },
  };
});

export const initialEdges: Edge[] = [
  {
    id: '0',
    source: '0',
    target: '1',
    type: FLOW_EDGE_TYPE_KEY.GRAY,
  },
  {
    id: '1',
    source: '1',
    target: '-1',
    type: FLOW_EDGE_TYPE_KEY.GRAY,
  },
];
