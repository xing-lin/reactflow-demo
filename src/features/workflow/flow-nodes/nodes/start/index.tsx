import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import { type NodeProps, useReactFlow } from '@xyflow/react';
import type { FlowNodeStart } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { NodePanelContainerMemo, PromptTextareaMemo } from '../../widgets';

export function FlowNodeStart({ id, data }: NodeProps<FlowNodeStart>) {
  const { updateNodeData } = useReactFlow();

  // data['goal']
  const { goal } = data;

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
              id={`${id}-edit`}
              value={goal}
              onChange={onChangeValue}
            />
            <div className="text-45 mt-1 text-xs/4.5">
              Finally, at the end of the process, this is verified
            </div>
            <ButtonSamplePrompt
              nodeId={id}
              nodeType={FLOW_NODE_TYPE_KEY.START}
              valueKey="goal"
            />
          </>
        </div>
      </NodePanelContainerMemo>
    </HandlesWrapper>
  );
}
