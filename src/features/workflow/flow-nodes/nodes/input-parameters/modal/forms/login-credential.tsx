import { Checkbox, Form, type FormInstance, Input } from 'antd';
import { type ModalData, type LoginCredentialsData } from '../../types';
import { useEffect } from 'react';
import { InputPassword } from '@/features/workflow/flow-nodes';

const Item = Form.Item<LoginCredentialsData>;
export function FormLoginCredential({
  form,
  modeData,
}: {
  form: FormInstance<ModalData['initialValues']>;
  modeData: ModalData;
}) {
  const { initialValues } = modeData;
  const useDefaultValue = Form.useWatch('default_enabled', form);

  useEffect(() => {
    if (!form) {
      return;
    }

    form.setFieldsValue(
      initialValues ?? {
        default_enabled: false,
      }
    );
  }, [form, initialValues]);

  return (
    <>
      <Item
        label="Platform"
        name="platform"
        rules={[
          {
            required: true,
            message: 'Please input the platform',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Item>
      <Item name="default_enabled" valuePropName="checked">
        <Checkbox>Use the default value</Checkbox>
      </Item>
      <Item hidden={!useDefaultValue} label="Account" name="default_account">
        <Input />
      </Item>
      <Item hidden={!useDefaultValue} label="Password" name="default_password">
        <InputPassword />
      </Item>
    </>
  );
}
