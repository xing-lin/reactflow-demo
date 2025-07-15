import { memo, type ReactNode } from 'react';
import { FLOW_NODE_TYPE_KEY, FLOW_NODE_TYPES } from '../../nodes';
import { PanelContainer } from '../../ui';
import { useReactFlow } from '@xyflow/react';
import { isNil } from 'lodash-es';
import { deleteNode } from './helper';

function NodePanelContainer({
  id,
  type,
  children,
}: {
  id: string;
  type: Exclude<FLOW_NODE_TYPE_KEY, 'ADD_NODE_BUTTON' | 'LOOP_CONTAINER'>;
  children: ReactNode;
}) {
  const { getNodes, getEdges, setNodes, setEdges, getNode } = useReactFlow();
  const { title, iconSrc, color, description } = FLOW_NODE_TYPES[type];

  const hideDeleteButton = [
    FLOW_NODE_TYPE_KEY.START,
    FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
  ].includes(type);

  const onDelete = () => {
    const currentNode = getNode(id);

    if (isNil(currentNode)) {
      throw new Error('Selected node is null');
    }

    const { positionedEdges, positionedNodes } = deleteNode({
      removeNodeId: id,
      oldEdges: getEdges(),
      oldNodes: getNodes(),
    });

    setNodes(positionedNodes);
    setEdges(positionedEdges);
  };

  return (
    <PanelContainer
      title={title}
      color={color}
      src={iconSrc}
      description={description}
      onDelete={hideDeleteButton ? undefined : onDelete}
      // 是否正在运行这个节点，边框绿光
      active={false}
    >
      {children}
    </PanelContainer>
  );
}

export const NodePanelContainerMemo = memo(NodePanelContainer);
