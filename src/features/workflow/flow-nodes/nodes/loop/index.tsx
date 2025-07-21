import { type NodeProps, useReactFlow } from '@xyflow/react';
import {
  ButtonSamplePrompt,
  FlowInputNumber,
  FormLabel,
  HandlesWrapper,
} from '../../ui';
import type { FlowNodeLoop } from './types';
import { NodePanelContainerMemo, PromptTextareaMemo } from '../../widgets';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeLoop({ id, data }: NodeProps<FlowNodeLoop>) {
  const { updateNodeData } = useReactFlow();

  const { goal, limit } = data;

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
            id={id}
            value={goal}
            onChange={(value) => onChange('goal', value)}
          />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.LOOP}
            onChangePrompt={(value) => onChange('goal', value)}
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
