import { Select, type SelectProps } from 'antd';
import { getPopupContainer } from '../helper';
import { cn } from '@/utils';

export function FlowSelect({ className, style, ...restProps }: SelectProps) {
  return (
    <Select
      {...restProps}
      className={cn('nopan nodrag', className)}
      getPopupContainer={getPopupContainer}
      style={{
        width: '100%',
        ...style,
      }}
    />
  );
}
