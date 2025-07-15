import { cn } from '@/utils';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function FormLabel({ children, className }: Props) {
  return (
    <div className={cn('text-88 mb-2 text-sm/5.5', className)}>{children}</div>
  );
}
