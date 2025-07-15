import { Checkbox, Form, type FormInstance, Input, Select } from 'antd';
import {
  INPUT_PARAMETERS_VALUE_TYPE_KEY,
  type InputParametersData,
  type ModalData,
  INPUT_PARAMETERS_VALUE_TYPE_OPTIONS,
} from '../../types';

import { useEffect } from 'react';
import { FormInputTextarea } from '../../../../ui';

const Item = Form.Item<InputParametersData>;
export function FormInputParameters({
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
        type: INPUT_PARAMETERS_VALUE_TYPE_KEY.STRING,
        default_enabled: false,
      }
    );
  }, [form, initialValues]);

  return (
    <>
      <Item
        label="Name"
        name="name"
        normalize={(value) => value?.replace(/\s+/g, '')}
        rules={[{ required: true, message: 'Please enter the parameter name' }]}
      >
        <Input maxLength={64} placeholder="Please enter the parameter name" />
      </Item>
      <Item
        label="Description"
        name="description"
        normalize={(value) => value?.trim()}
      >
        <FormInputTextarea
          maxLength={128}
          placeholder="Please enter the parameter description"
        />
      </Item>
      <Item
        label="Value Type"
        name="type"
        rules={[{ required: true, message: 'Value type is required' }]}
      >
        <Select
          options={INPUT_PARAMETERS_VALUE_TYPE_OPTIONS}
          allowClear={false}
          placeholder="Please select the value type"
        />
      </Item>
      <Item name="default_enabled" valuePropName="checked">
        <Checkbox>Use the default value</Checkbox>
      </Item>

      <Item name="default_value" hidden={!useDefaultValue}>
        <FormInputTextarea placeholder="Please enter the default value" />
      </Item>
    </>
  );
}
