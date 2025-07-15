import { type NodeProps, useReactFlow } from '@xyflow/react';
import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import { type SelectProps } from 'antd';
import {
  InAbnormalActionSelect,
  NodePanelContainerMemo,
  PromptTextareaMemo,
} from '../../widgets';
import type { FlowNodeInputText } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { useChangeInitialValue } from '../../widgets';

export function FlowNodeInputText({ id, data }: NodeProps<FlowNodeInputText>) {
  const { goal, inAbnormalAction } = data;

  const { key, initialValue, onChangeInitialValue } = useChangeInitialValue({
    initialValue: goal,
  });

  const { updateNodeData } = useReactFlow();

  const onChangeInputTextarea = (value: string) => {
    updateNodeData(id, {
      goal: value,
    });
  };

  const onChangeSelect: SelectProps['onChange'] = (value) => {
    updateNodeData(id, {
      inAbnormalAction: value,
    });
  };

  return (
    <HandlesWrapper>
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.INPUT_TEXT}>
        <div className="pt-4">
          <FormLabel>
            Describes the page scrolling direction and scrolling position
          </FormLabel>
          <PromptTextareaMemo
            key={key}
            id={id}
            initialValue={initialValue}
            onChange={onChangeInputTextarea}
          />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.INPUT_TEXT}
            onChangePrompt={(value) => {
              onChangeInputTextarea(value);
              onChangeInitialValue(value);
            }}
          />

          <InAbnormalActionSelect
            value={inAbnormalAction}
            onChange={onChangeSelect}
          />
        </div>
      </NodePanelContainerMemo>
    </HandlesWrapper>
  );
}
