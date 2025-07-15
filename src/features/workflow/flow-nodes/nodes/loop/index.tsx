import { type NodeProps, useReactFlow } from '@xyflow/react';
import {
  ButtonSamplePrompt,
  FlowInputNumber,
  FormLabel,
  HandlesWrapper,
} from '../../ui';
import type { FlowNodeLoop } from './types';
import {
  NodePanelContainerMemo,
  PromptTextareaMemo,
  useChangeInitialValue,
} from '../../widgets';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeLoop({ id, data }: NodeProps<FlowNodeLoop>) {
  const { updateNodeData } = useReactFlow();

  const { goal, limit } = data;

  const { key, initialValue, onChangeInitialValue } = useChangeInitialValue({
    initialValue: goal,
  });

  const onChange = (key: string, value: string | number) => {
    updateNodeData(id, {
      [key]: value,
    });
  };

  return (
    <HandlesWrapper hideSourceHandle>
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.LOOP}>
        <div className="pt-4">
          <FormLabel>
            Describe the ultimate goal that needs to be achieved
          </FormLabel>
          <PromptTextareaMemo
            key={key}
            id={id}
            initialValue={initialValue}
            onChange={(value) => onChange('goal', value)}
          />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.LOOP}
            onChangePrompt={(prompt) => {
              onChange('goal', prompt);
              onChangeInitialValue(prompt);
            }}
          />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="text-88 text-sm/5.5">Maximum number of cycles:</div>
          <FlowInputNumber
            min={1}
            value={limit}
            onChange={(value) => onChange('limit', value as number)}
          />
        </div>
      </NodePanelContainerMemo>
    </HandlesWrapper>
  );
}
