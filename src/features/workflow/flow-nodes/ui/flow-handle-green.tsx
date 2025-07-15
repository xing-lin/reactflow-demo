import { Handle, Position, type HandleProps } from '@xyflow/react';

export function FlowHandleGreen({
  style,
  position,
  ...restProps
}: HandleProps) {
  const greenDotStyle = {
    width: 8,
    minWidth: 8,
    height: 2,
    minHeight: 2,
    background: '#1DDE74',
    borderRadius: 0,
    border: 'none',
    ...style,
  };

  if (position === Position.Top) {
    greenDotStyle.transform = 'translate(-50%, -100%)';
  } else if (position === Position.Bottom) {
    greenDotStyle.transform = 'translate(-50%, 100%)';
  }

  return (
    <Handle
      {...restProps}
      position={position}
      style={greenDotStyle}
    />
  );
}
