import {
  addEdge,
  Background,
  Controls,
  PanOnScrollMode,
  ReactFlow,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  type Connection,
  type ReactFlowProps,
} from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';
import { initialEdges, initialNodes } from './helper';
import {
  applyLayout,
  edgeTypes,
  FlowPaletteNode,
  nodeTypes,
  PromptListPanel,
} from './flow-nodes';
import '@xyflow/react/dist/style.css';
import './index.css';

export function Workflow() {
  // 判断节点是否初始化完成
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: false });

  const editorElementRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (nodesInitialized) {
      const { positionedNodes, positionedEdges } = applyLayout({
        nodes,
        edges,
      });

      setNodes(positionedNodes);
      setEdges(positionedEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesInitialized]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesChangeWrapper: ReactFlowProps['onNodesChange'] = (changes) => {
    const dimensionChanges = changes.filter(
      (change) => change.type === 'dimensions'
    );
    const tempNodes = [...nodes];
    dimensionChanges.forEach((change) => {
      const node = tempNodes.find((node) => node.id === change.id);
      if (node) {
        if (node.measured?.width) {
          node.measured.width = change.dimensions?.width;
        }
        if (node.measured?.height) {
          node.measured.height = change.dimensions?.height;
        }
      }
    });

    if (dimensionChanges.length > 0) {
      const { positionedEdges, positionedNodes } = applyLayout({
        nodes: tempNodes,
        edges,
      });

      setNodes(positionedNodes);
      setEdges(positionedEdges);
    }

    onNodesChange(changes);
  };

  return (
    <div className="relative h-screen">
      <ReactFlow
        ref={editorElementRef}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeWrapper}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesConnectable={false}
        fitView
        fitViewOptions={{
          maxZoom: 1,
        }}
        deleteKeyCode={null}
        // 滚动不缩放
        zoomOnScroll={false}
        // 在滚动时平移
        panOnScroll={true}
        // 垂直滚动
        panOnScrollMode={PanOnScrollMode.Vertical}
        // // 禁止拖拽
        // panOnDrag={false}
      >
        <Controls />
        <PromptListPanel />
        <FlowPaletteNode />
        <Background bgColor="#F0F0F1" />
      </ReactFlow>
    </div>
  );
}
