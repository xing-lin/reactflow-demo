import { type NodeProps, useReactFlow } from '@xyflow/react';
import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import { type SelectProps } from 'antd';
import {
  InAbnormalActionSelect,
  NodePanelContainerMemo,
  PromptTextareaMemo,
} from '../../widgets';
import type { FlowNodeClickElement } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeClickElement({
  id,
  data,
}: NodeProps<FlowNodeClickElement>) {
  const { goal, inAbnormalAction } = data;
  const { updateNodeData } = useReactFlow();

  const onChangeValue = (value: string) => updateNodeData(id, { goal: value });
  const onChangeSelect: SelectProps['onChange'] = (value) => {
    updateNodeData(id, {
      inAbnormalAction: value,
    });
  };

  return (
    <HandlesWrapper>
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.CLICK_ELEMENT}>
        <div className="pt-4">
          <FormLabel>
            Describe the mouse click action and click object/@parameter
          </FormLabel>
          <PromptTextareaMemo id={id} value={goal} onChange={onChangeValue} />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.CLICK_ELEMENT}
            onChangePrompt={onChangeValue}
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
