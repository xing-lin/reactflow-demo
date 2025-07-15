import { EyeOutlined } from '@ant-design/icons';
import { Input, type InputProps } from 'antd';
import { IconEyeClose } from './icon-eye-close';

export const InputPassword = (props: InputProps) => {
  return (
    <Input.Password
      autoComplete="current-password"
      iconRender={(visible) =>
        visible ? (
          <EyeOutlined />
        ) : (
          <button type="button">
            <IconEyeClose className="text-45 hover:text-88 cursor-pointer" />
          </button>
        )
      }
      {...props}
    />
  );
};
