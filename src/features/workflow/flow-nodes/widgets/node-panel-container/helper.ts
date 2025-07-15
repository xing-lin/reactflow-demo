import type { Edge, Node } from '@xyflow/react';
import { applyLayout } from '../../helper';
import { v4 as getUuid } from 'uuid';
import { getEdgeType } from '../../edges';
import { isNil } from 'lodash-es';
import { isFlowNodeLoop } from '../../nodes';

interface DeleteNodeProps {
  removeNodeId: string;
  oldNodes: Node[];
  oldEdges: Edge[];
}

export function deleteNode({
  removeNodeId,
  oldNodes,
  oldEdges,
}: DeleteNodeProps) {
  let selectedNode = oldNodes.find((item) => item.id === removeNodeId);

  if (isFlowNodeLoop(selectedNode?.type) && selectedNode?.parentId) {
    selectedNode = oldNodes.find((item) => selectedNode!.parentId === item.id);
  }

  if (isNil(selectedNode)) {
    throw new Error('node not found');
  }

  const childrenIds = getChildrenIds(oldNodes, selectedNode.id, []);

  const removeIds = [selectedNode.id, ...childrenIds];

  const newNodes = oldNodes.filter((node) => !removeIds.includes(node.id));

  const newEdges = removeIds.reduce((prev, cur) => {
    return removeDeletedNodeConnection({
      oldEdges: prev,
      oldNodes,
      removeNodeId: cur,
    });
  }, oldEdges);

  return applyLayout({
    nodes: newNodes,
    edges: newEdges,
  });
}

function removeDeletedNodeConnection({
  oldEdges,
  oldNodes,
  removeNodeId,
}: DeleteNodeProps): Edge[] {
  let removeIdSource: string | null = null;
  let removeIdTarget: string | null = null;

  let newEdges = oldEdges.filter((item) => {
    if (item.target === removeNodeId) {
      removeIdSource = item.source;
      return false;
    }

    if (item.source === removeNodeId) {
      removeIdTarget = item.target;
      return false;
    }

    return true;
  });

  if (removeIdSource && removeIdTarget) {
    newEdges = newEdges.concat([
      {
        id: getUuid(),
        source: removeIdSource,
        target: removeIdTarget,
        type: getEdgeType(
          oldNodes.find((item) => item.id === removeIdTarget)?.type,
        ),
      },
    ]);
  }

  return newEdges;
}

function getChildrenIds(
  nodes: Node[],
  nodeId: string,
  initValue: string[] = [],
): string[] {
  const children = nodes.filter((node) => node.parentId === nodeId);

  if (children.length > 0) {
    return children.reduce((acc, child) => {
      return [...acc, child.id, ...getChildrenIds(nodes, child.id)];
    }, initValue);
  } else {
    return initValue;
  }
}
