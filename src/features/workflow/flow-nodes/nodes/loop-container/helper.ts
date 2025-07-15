import { type Node } from '@xyflow/react';

export const NODE_PANEL_CONTAINER_WIDTH = 360;
export const NODE_PANEL_CONTAINER_PADDING = 16;

function getNestingLevel(node: Node, nodes: Array<Node>): number {
  let level = 0;
  let current = nodes.find((n) => n.id === node.parentId);
  while (current) {
    level++;
    current = nodes.find((n) => n.id === current?.parentId);
  }
  return level;
}

function maxNestingLevel(nodes: Array<Node>): number {
  return Math.max(...nodes.map((node) => getNestingLevel(node, nodes)));
}

export function getLoopNodeWidth(node: Node, nodes: Array<Node>): number {
  const maxNesting = maxNestingLevel(nodes);
  const nestingLevel = getNestingLevel(node, nodes);
  return (
    NODE_PANEL_CONTAINER_WIDTH +
    (maxNesting - nestingLevel) * NODE_PANEL_CONTAINER_PADDING * 2
  );
}
