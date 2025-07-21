import {
  FLOW_NODE_TYPE_KEY,
  type FlowNode,
  isFinishFlowNode,
  isFlowNodeLoop,
} from '../../nodes';
import { INPUT_PARAMETERS_TYPE_KEY } from '../../nodes/input-parameters/types';
import { IN_ABNORMAL_ACTION_TYPE_KEY } from '../in-abnormal-action-select/types';
import { OUTPUT_TYPE_KEY } from '../../nodes/finish-output-data/types';
import { type AddNodeProps, type CreateNodeProps } from './types';
import { applyLayout } from '../../helper';
import { v4 as getUuid } from 'uuid';
import { type Edge } from '@xyflow/react';
import { getEdgeType } from '../../edges';

export const canAddNodes = [
  FLOW_NODE_TYPE_KEY.VISIT_PAGE,
  FLOW_NODE_TYPE_KEY.CLICK_ELEMENT,
  FLOW_NODE_TYPE_KEY.INPUT_TEXT,
  FLOW_NODE_TYPE_KEY.SCROLL_PAGE,
  FLOW_NODE_TYPE_KEY.EXTRACT_DATA,
  FLOW_NODE_TYPE_KEY.LOOP,
  FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA,
];

export function addNode({
  oldNodes,
  oldEdges,
  data,
  nodeType: _nodeType,
}: AddNodeProps) {
  const { parent, next } = data || {};

  const nodeId = getUuid();
  const edgeId = getUuid();

  let extraNodes: FlowNode[] = [];
  let extraEdges: Edge[] = [];
  let nodeType = _nodeType;

  const end = isFinishFlowNode(nodeType);

  if (isFlowNodeLoop(nodeType)) {
    const { loopNodes, loopEdges } = createLoopNode({ id: nodeId });

    nodeType = FLOW_NODE_TYPE_KEY.LOOP_CONTAINER;

    extraNodes = loopNodes;
    extraEdges = loopEdges;
  }

  let newNodes = oldNodes
    .concat(createNode({ nodeType, id: nodeId, parentId: parent }))
    .concat(extraNodes);

  const nextNode = oldNodes.find((node) => node.id === next);

  if (end && nextNode) {
    newNodes = newNodes.filter((node) => node.id !== nextNode.id);
  }

  const nextEdgeType = getEdgeType(nextNode?.type);

  const newEdges = oldEdges
    .map((item) => {
      if (item.target === next) {
        const prevEdgeType = getEdgeType(
          oldNodes.find((node) => node.id === item.source)?.type
        );

        return {
          ...item,
          target: nodeId,
          type: prevEdgeType,
        };
      }
      return item;
    })
    .concat(
      end
        ? []
        : [
            {
              id: edgeId,
              source: nodeId,
              target: next as string,
              type: nextEdgeType,
            },
          ]
    )
    .concat(extraEdges);

  return applyLayout({
    nodes: newNodes,
    edges: newEdges,
  });
}

const createLoopNode = ({
  id,
}: Omit<CreateNodeProps, 'nodeType'>): {
  loopNodes: FlowNode[];
  loopEdges: Edge[];
} => {
  const loop = createNode({
    nodeType: FLOW_NODE_TYPE_KEY.LOOP,
    id: getUuid(),
    parentId: id,
  });

  const addNodeButton = createNode({
    nodeType: FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON,
    id: getUuid(),
    parentId: id,
  });

  return {
    loopNodes: [loop, addNodeButton],
    loopEdges: [
      {
        id: getUuid(),
        source: loop.id,
        target: addNodeButton.id,
        type: getEdgeType(FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON),
      },
    ],
  };
};

export function createNode({
  nodeType,
  id,
  parentId,
}: CreateNodeProps): FlowNode {
  const common = {
    position: { x: 0, y: 0 },
    draggable: false,
  };
  const identifiers = {
    id,
    parentId,
  };

  const defaultAction = {
    inAbnormalAction: IN_ABNORMAL_ACTION_TYPE_KEY.STOP_TASK,
  };

  switch (nodeType) {
    case FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {},
      };

    case FLOW_NODE_TYPE_KEY.CLICK_ELEMENT:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          goal: '',
        },
      };

    case FLOW_NODE_TYPE_KEY.EXTRACT_DATA:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          goal: '',
          filter: '',
        },
      };

    case FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          output_type: OUTPUT_TYPE_KEY.TEXT,
        },
      };

    case FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          [INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER]: [],
          [INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL]: [],
        },
      };

    case FLOW_NODE_TYPE_KEY.INPUT_TEXT:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          goal: '',
        },
      };

    case FLOW_NODE_TYPE_KEY.LOOP:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          goal: '',
          limit: 1,
        },
      };
    case FLOW_NODE_TYPE_KEY.LOOP_CONTAINER:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {},
      };
    case FLOW_NODE_TYPE_KEY.SCROLL_PAGE:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          goal: '',
        },
      };
    case FLOW_NODE_TYPE_KEY.START:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          goal: '',
          ip_region: '',
          ip_type: '',
        },
      };
    case FLOW_NODE_TYPE_KEY.VISIT_PAGE:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
          goal: '',
        },
      };

    default:
      return {
        ...common,
        ...identifiers,
        type: nodeType,
        data: {
          ...defaultAction,
        },
      };
  }
}

//   let node = null;

//   const node = [
//     {
//       id: id,
//       parentId,
//       type: nodeType,
//       data: {},
//     },
//   ];

// export function createEdge(){

// }
