import { BaseEdge, type EdgeProps, getSmoothStepPath } from '@xyflow/react';

export function EdgeGray({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        strokeWidth: 2,
        stroke: '#D0D5DC',
      }}
    />
  );
}
