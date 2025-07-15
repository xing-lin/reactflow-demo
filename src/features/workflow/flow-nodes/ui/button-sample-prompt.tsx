import { type HTMLAttributes } from 'react';
import { cn } from '@/utils';
import { useAppDispatch } from '@/app/hooks';
import { setPromptDrawerData } from '../../slice';
import type { InitialState } from '../../slice.types';

export function ButtonSamplePrompt({
  nodeId,
  nodeType,
  onChangePrompt,
  className,
  ...restProps
}: HTMLAttributes<HTMLButtonElement> &
  InitialState['promptDrawerData']['initialValues']) {
  const dispatch = useAppDispatch();

  return (
    <button
      {...restProps}
      type="button"
      className={cn(
        'btn text-88 mt-2 flex h-8 w-full items-center justify-center gap-2 rounded-md bg-black/4 text-sm/5.5',
        className
      )}
      onClick={() => {
        dispatch(
          setPromptDrawerData({
            open: true,
            initialValues: {
              nodeId,
              nodeType,
              onChangePrompt,
            },
          })
        );
      }}
    >
      <img
        alt="sample prompt button icon"
        src="/images/flow-nodes/sample-prompt.svg"
        width={16}
        height={16}
      />
      <span>Sample prompt message</span>
    </button>
  );
}
