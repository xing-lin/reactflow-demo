import { Input } from 'antd';
import { type TextAreaProps } from 'antd/es/input';

export function FormInputTextarea(props: TextAreaProps) {
  return (
    <Input.TextArea {...props} className="nopan nodrag !h-30 !resize-none" />
  );
}
