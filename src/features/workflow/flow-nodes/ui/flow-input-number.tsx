import { cn } from '@/utils';
import { InputNumber, type InputNumberProps } from 'antd';

export function FlowInputNumber({ className, ...restProps }: InputNumberProps) {
  return <InputNumber className={cn('nopan', className)} {...restProps} />;
}
