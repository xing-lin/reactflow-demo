import Dagre from '@dagrejs/dagre';
import { type Edge, type Node } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY } from './nodes';
import { getLoopNodeWidth } from './nodes/loop-container/helper';

export const MAX_NESTED_LOOPS = 3;

export const isCreateMode = (mode: string) => mode === 'CREATE';
export const isEditMode = (mode: string) => mode === 'EDIT';

export const getPopupContainer = (triggerNode: HTMLElement) => {
  return triggerNode.parentElement || document.body;
};

export interface LayoutOptions extends Dagre.configUnion {
  rankdir?: 'TB' | 'LR';
  ranksep?: number;
}

const DEFAULT_OPTIONS: LayoutOptions = {
  rankdir: 'TB',
  ranksep: 60,
};

export function applyLayout({
  nodes,
  edges,
  options = {},
}: {
  nodes: Node[];
  edges: Edge[];
  options?: LayoutOptions;
}) {
  const loopNodes = nodes.filter(
    (node) => node.type === FLOW_NODE_TYPE_KEY.LOOP_CONTAINER
  );
  const loopNodeChildren: Array<Array<Node>> = loopNodes.map(() => []);

  loopNodes.forEach((node, index) => {
    const childNodes = nodes.filter((n) => n.parentId === node.id);
    const childEdges = edges.filter((edge) =>
      childNodes.some(
        (node) => node.id === edge.source || node.id === edge.target
      )
    );
    const maxChildWidth = Math.max(
      ...childNodes.map((node) => node.measured?.width ?? 0)
    );
    const loopNodeWidth = getLoopNodeWidth(node, nodes);
    const layouted = applyDagreLayout({
      nodes: childNodes,
      edges: childEdges,
      options: {
        marginx: (loopNodeWidth - maxChildWidth) / 2,
        marginy: 16,
      },
    });
    loopNodeChildren[index] = layouted.positionedNodes;
  });

  const topLevelNodes = nodes.filter((node) => !node.parentId);

  const { positionedNodes: topLevelNodesLayout, positionedEdges } =
    applyDagreLayout({ nodes: topLevelNodes, edges, options });

  return {
    positionedNodes: topLevelNodesLayout.concat(loopNodeChildren.flat()),
    positionedEdges,
  };
}

export function applyDagreLayout({
  nodes,
  edges,
  options = {},
}: {
  nodes: Node[];
  edges: Edge[];
  options?: LayoutOptions;
}): { positionedNodes: Node[]; positionedEdges: Edge[] } {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph(mergedOptions);

  edges.forEach((e) => g.setEdge(e.source, e.target));
  nodes.forEach((n) => {
    const width = n.measured?.width ?? 0;
    const height = n.measured?.height ?? 0;
    g.setNode(n.id, { width, height });
  });

  Dagre.layout(g);

  const newNodes = nodes.map((n) => {
    const d = g.node(n.id);
    const x = d.x - (n.measured?.width ?? 0) / 2;
    let y = d.y - (n.measured?.height ?? 0) / 2;

    if (n.type === FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON) {
      y -= (options.ranksep ?? DEFAULT_OPTIONS.ranksep!) / 2;
    }

    return {
      ...n,
      position: { x, y },
      draggable: false,
    };
  });

  return {
    positionedNodes: newNodes,
    positionedEdges: edges,
  };
}
