import { type NodeProps, useReactFlow } from '@xyflow/react';
import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import { type SelectProps } from 'antd';
import {
  InAbnormalActionSelect,
  NodePanelContainerMemo,
  PromptTextareaMemo,
  useChangeInitialValue,
} from '../../widgets';
import type { FlowNodeScrollPage } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeScrollPage({
  id,
  data,
}: NodeProps<FlowNodeScrollPage>) {
  const { goal, inAbnormalAction } = data;
  const { updateNodeData } = useReactFlow();

  const { key, initialValue, onChangeInitialValue } = useChangeInitialValue({
    initialValue: goal,
  });

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
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.SCROLL_PAGE}>
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
            nodeType={FLOW_NODE_TYPE_KEY.SCROLL_PAGE}
            onChangePrompt={(prompt) => {
              onChangeInputTextarea(prompt);
              onChangeInitialValue(prompt);
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
