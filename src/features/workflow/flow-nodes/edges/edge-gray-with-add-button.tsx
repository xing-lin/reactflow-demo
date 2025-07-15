import {
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
  useNodes,
} from '@xyflow/react';
import { ButtonAddNode } from '../ui';
import { EdgeGray } from './edge-gray';
import { useOverNestedLoopTimes } from '../hooks';
import { useAppDispatch } from '@/app/hooks';
import { setPaletteDrawerData } from '../../slice';

export function EdgeGrayWithAddButton(props: EdgeProps) {
  const dispatch = useAppDispatch();
  const { isLimitLoop } = useOverNestedLoopTimes();
  const {
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;
  const [, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const nodes = useNodes();
  const sourceNode = nodes.find((node) => node.id === source);

  return (
    <>
      <EdgeGray {...props} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <ButtonAddNode
            onClick={() => {
              dispatch(
                setPaletteDrawerData({
                  open: true,
                  initialValues: {
                    previous: source,
                    next: target,
                    parent: sourceNode?.parentId,
                    limitLoop: isLimitLoop({ nodeId: source }),
                  },
                })
              );
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
