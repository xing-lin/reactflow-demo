import { type NodeProps, useReactFlow } from '@xyflow/react';
import { FormLabel, HandlesWrapper } from '../../ui';
import { outputTypeOptions } from './helper';
import type { FlowNodeFinishOutputData } from './types';
import { InAbnormalActionSelect, NodePanelContainerMemo } from '../../widgets';
import { FlowSelect } from '../../ui/flow-select';
import { FLOW_NODE_TYPE_KEY } from '../types';

export function FlowNodeFinishOutputData({
  id,
  data,
}: NodeProps<FlowNodeFinishOutputData>) {
  const { output_type, inAbnormalAction } = data;
  const { updateNodeData } = useReactFlow();

  const onChangeSelect = (
    value: string,
    type: 'inAbnormalAction' | 'output_type'
  ) => {
    updateNodeData(id, {
      [type]: value,
    });
  };

  return (
    <HandlesWrapper hideTargetHandle>
      <NodePanelContainerMemo
        id={id}
        type={FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA}
      >
        <div className="pt-4">
          <FormLabel>Formal output</FormLabel>
          <FlowSelect
            value={output_type}
            options={outputTypeOptions}
            onChange={(value) => onChangeSelect(value, 'output_type')}
            placeholder="Select output type"
          />

          <InAbnormalActionSelect
            value={inAbnormalAction}
            onChange={(value) => onChangeSelect(value, 'inAbnormalAction')}
          />
        </div>
      </NodePanelContainerMemo>
    </HandlesWrapper>
  );
}
