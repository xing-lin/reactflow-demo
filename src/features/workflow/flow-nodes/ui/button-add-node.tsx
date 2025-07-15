import { cn } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { type HTMLAttributes } from 'react';

export function ButtonAddNode(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'text-88 grid size-6 origin-center cursor-pointer place-content-center rounded-full border-2 border-[#D9D9D9] bg-white text-sm hover:scale-105 active:scale-95',
        props.className
      )}
    >
      <PlusOutlined />
    </button>
  );
}
