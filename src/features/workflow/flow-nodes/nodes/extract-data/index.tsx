import { type NodeProps, useReactFlow } from '@xyflow/react';
import { ButtonSamplePrompt, FormLabel, HandlesWrapper } from '../../ui';
import type { SelectProps } from 'antd';
import {
  InAbnormalActionSelect,
  NodePanelContainerMemo,
  PromptTextareaMemo,
} from '../../widgets';
import type { FlowNodeExtractData } from './types';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeExtractData({
  id,
  data,
}: NodeProps<FlowNodeExtractData>) {
  const { goal, filter, inAbnormalAction } = data;
  const { updateNodeData } = useReactFlow();

  const onChangeInputTextarea = (value: string, type: 'goal' | 'filter') => {
    updateNodeData(id, {
      [type]: value,
    });
  };

  const onChangeSelect: SelectProps['onChange'] = (value) => {
    updateNodeData(id, {
      inAbnormalAction: value,
    });
  };

  return (
    <HandlesWrapper>
      <NodePanelContainerMemo id={id} type={FLOW_NODE_TYPE_KEY.EXTRACT_DATA}>
        <div className="pt-4">
          <FormLabel>
            Description of the data to be collected and the corresponding
            storage field names
          </FormLabel>
          <PromptTextareaMemo
            id={`${id}-goal`}
            value={goal}
            onChange={(value) => onChangeInputTextarea(value, 'goal')}
          />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.EXTRACT_DATA}
            valueKey="goal"
          />

          <FormLabel className="mt-6">
            Description of the scope of data collection for the currently
            displayed screen
          </FormLabel>
          <PromptTextareaMemo
            id={`${id}-filter`}
            value={filter}
            onChange={(value) => onChangeInputTextarea(value, 'filter')}
          />
          <ButtonSamplePrompt
            nodeId={id}
            nodeType={FLOW_NODE_TYPE_KEY.EXTRACT_DATA}
            valueKey="filter"
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
