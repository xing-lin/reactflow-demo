import { isNil } from 'lodash-es';
import { type Node, useReactFlow } from '@xyflow/react';
import { MAX_NESTED_LOOPS } from '../helper';

export function useOverNestedLoopTimes() {
  const { getNodes } = useReactFlow();

  const isLimitLoop = ({ nodeId }: { nodeId: string }) => {
    const sourceNodes = getNodes();
    const loopTimes = findParentTimes({
      loopTimes: 0,
      id: nodeId,
      sourceNodes,
    });

    return loopTimes >= MAX_NESTED_LOOPS;
  };
  function findParentTimes({
    loopTimes,
    id,
    sourceNodes,
  }: {
    loopTimes: number;
    sourceNodes: Node[];
    id?: string;
  }) {
    const item = sourceNodes.find((node) => node.id === id);

    if (loopTimes >= MAX_NESTED_LOOPS || isNil(item?.parentId)) {
      return loopTimes;
    }

    return findParentTimes({
      loopTimes: loopTimes + 1,
      id: item!.parentId,
      sourceNodes,
    });
  }

  return {
    isLimitLoop,
  };
}
