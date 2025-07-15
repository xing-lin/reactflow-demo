import { Handle, type NodeProps, Position } from '@xyflow/react';
import { ButtonAddNode } from '../../ui';
import type { FlowNodeAddNodeButton } from './types';
import { useOverNestedLoopTimes } from '../../hooks';
import { useAppDispatch } from '@/app/hooks';
import { setPaletteDrawerData } from '@/features/workflow/slice';

export function FlowNodeAddNodeButton({
  id,
  parentId,
}: NodeProps<FlowNodeAddNodeButton>) {
  const dispatch = useAppDispatch();
  const { isLimitLoop } = useOverNestedLoopTimes();

  return (
    <div>
      <ButtonAddNode
        onClick={() => {
          dispatch(
            setPaletteDrawerData({
              open: true,
              initialValues: {
                next: id,
                parent: parentId,
                limitLoop: isLimitLoop({ nodeId: id }),
              },
            })
          );
        }}
      />
      <Handle
        style={{
          width: 2,
          minWidth: 2,
          background: '#D0D5DC',
          transform: 'translate(-50%, -100%)',
          borderRadius: 0,
          border: 'none',
        }}
        type="target"
        position={Position.Top}
      />
    </div>
  );
}
