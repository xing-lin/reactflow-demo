import { type SelectProps } from 'antd';
import { inAbnormalActionOptions } from './helper';
import { FlowSelect, FormLabel } from '../../ui';
export function InAbnormalActionSelect({
  value,
  onChange,
  placeholder,
  ...resetProps
}: SelectProps) {
  return (
    <div className="mt-6">
      <FormLabel>In abnormal situations</FormLabel>
      <FlowSelect
        {...resetProps}
        options={inAbnormalActionOptions}
        value={value}
        placeholder={placeholder || 'Select an action'}
        onChange={onChange}
      />
    </div>
  );
}
