import { Position } from '@xyflow/react';
import { FlowHandleGreen } from './flow-handle-green';
import { type HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // types?: ('source' | 'target')[];
  hideTargetHandle?: boolean;
  hideSourceHandle?: boolean;
}

export function HandlesWrapper({
  children,
  className,
  style,
  hideTargetHandle,
  hideSourceHandle,
}: Props) {
  return (
    <div className={className} style={style}>
      {children}
      {hideTargetHandle ? null : (
        <FlowHandleGreen type="source" position={Position.Bottom} />
      )}

      {hideSourceHandle ? null : (
        <FlowHandleGreen type="target" position={Position.Top} />
      )}
    </div>
  );
}
