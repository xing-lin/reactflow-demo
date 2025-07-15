import { type NodeProps, useNodes } from '@xyflow/react';
import { getLoopNodeWidth, NODE_PANEL_CONTAINER_PADDING } from './helper';
import { HandlesWrapper } from '../../ui';
import type { FlowNodeLoopContainer } from './types';
import { type FlowNode } from '../types';

export function FlowNodeLoopContainer({
  id,
}: NodeProps<FlowNodeLoopContainer>) {
  const nodes = useNodes<FlowNode>();
  const node = nodes.find((n) => n.id === id);
  if (!node) {
    throw new Error('Node not found');
  }

  const children = nodes.filter((node) => node.parentId === id);

  const furthestDownChild: FlowNode | null = children.reduce((acc, child) => {
    if (!acc) {
      return child;
    }
    if (child.position.y > acc.position.y) {
      return child;
    }
    return acc;
  }, null as FlowNode | null);

  const childrenHeightExtent =
    (furthestDownChild?.measured?.height ?? 0) +
    (furthestDownChild?.position.y ?? 0) +
    24;

  const loopNodeWidth = getLoopNodeWidth(node, nodes);

  return (
    <HandlesWrapper
      className="rounded-2xl border-2 border-[#D0D5DC]"
      style={{
        width: loopNodeWidth,
        height: childrenHeightExtent,
        padding: NODE_PANEL_CONTAINER_PADDING,
        position: 'relative',
      }}
    >
      <div className="absolute -top-6 right-0 border border-red-400">
        循环次数
      </div>
    </HandlesWrapper>
  );
}
