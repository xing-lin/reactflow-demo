import { CloseOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectPromptDrawerData,
  setPromptDrawerData,
} from '@/features/workflow/slice';
import { cn } from '@/utils';
import { mockData } from './mock';
import { useReactFlow } from '@xyflow/react';

export function PromptListPanel() {
  const { updateNodeData } = useReactFlow();
  const dispatch = useAppDispatch();
  const { open, initialValues } = useAppSelector(selectPromptDrawerData);

  const onClick = (prompt: string) => {
    if (initialValues) {
      const { nodeId, valueKey } = initialValues;
      updateNodeData(nodeId, {
        [valueKey]: prompt,
      });
    }
  };

  const onCancel = () => {
    dispatch(setPromptDrawerData({ open: false, initialValues: null }));
  };

  return (
    <div
      className={cn(
        'absolute top-4 right-4 bottom-4 z-9 flex h-full w-0 flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.04)] transition-all duration-300',
        { 'w-[400px]': open }
      )}
    >
      <header className="text-88 flex min-w-100 items-center gap-2 border-b border-[rgba(5,5,5,0.06)] px-6 py-4 text-base">
        <button onClick={onCancel} className="h-6 w-6">
          <CloseOutlined />
        </button>
        <h2 className="font-semibold">Prompt Message Example</h2>
      </header>
      <section className="flex min-w-100 flex-1 flex-col gap-4 overflow-hidden py-6">
        <div className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-6">
          {mockData
            .filter((item) => item.type === initialValues?.nodeType)
            .map((item) => {
              const { id, prompt } = item;
              return (
                <button
                  key={id}
                  onClick={() => {
                    onClick(prompt);
                  }}
                  className="min-h-fit cursor-pointer overflow-hidden rounded-md p-1.5 text-sm/5.5 text-black/88 hover:bg-[rgba(0,0,0,0.04)]"
                >
                  {prompt}
                </button>
              );
            })}
        </div>
      </section>
    </div>
  );
}
