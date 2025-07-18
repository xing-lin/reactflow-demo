import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import { type NodeProps, useReactFlow } from '@xyflow/react';
import type { FlowNodeStart } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';
import {
  NodePanelContainerMemo,
  PromptTextareaMemo,
  useChangeInitialValue,
} from '../../widgets';

export function FlowNodeStart({ id }: NodeProps<FlowNodeStart>) {
  const { updateNodeData } = useReactFlow();

  // data['goal']

  const value = 'textarea value-> {{123@qq.com}}';

  const { key, initialValue, onChangeInitialValue } = useChangeInitialValue({
    initialValue: value,
  });

  const onChangeValue = (value: string) => {
    updateNodeData(id, {
      goal: value,
    });
  };

  return (
    <HandlesWrapper>
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.START}>
        <div className="pt-4">
          <>
            <FormLabel>
              Describe the ultimate goal that needs to be achieved
            </FormLabel>
            <PromptTextareaMemo
              key={key}
              id={`${id}-edit`}
              initialValue={initialValue}
              onChange={onChangeValue}
            />
            <div className="text-45 mt-1 text-xs/4.5">
              Finally, at the end of the process, this is verified
            </div>
            <ButtonSamplePrompt
              nodeId={id}
              nodeType={FLOW_NODE_TYPE_KEY.START}
              onChangePrompt={(value) => {
                onChangeValue(value);
                onChangeInitialValue(value);
              }}
            />
          </>
        </div>
      </NodePanelContainerMemo>
    </HandlesWrapper>
  );
}
