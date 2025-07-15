import { Form, type FormInstance, type FormProps } from 'antd';
import { INPUT_PARAMETERS_TYPE_KEY, type ModalData } from '../types';
import { FormInputParameters } from './forms';
import { FormLoginCredential } from './forms/login-credential';

interface Props {
  modalData: ModalData;
  form: FormInstance<ModalData['initialValues']>;
  onFinish: FormProps['onFinish'];
  id: string;
}

export function ModalForm({ modalData, form, onFinish, id }: Props) {
  const { type } = modalData;

  let formItemsDOM = null;

  switch (type) {
    case INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER: {
      formItemsDOM = <FormInputParameters form={form} modeData={modalData} />;
      break;
    }

    case INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL: {
      formItemsDOM = <FormLoginCredential form={form} modeData={modalData} />;
      break;
    }
  }

  return (
    <Form
      id={id}
      layout="vertical"
      form={form}
      onFinish={onFinish}
      //   className="[&_.ant-form-item]:!mb-4"
    >
      {formItemsDOM}
    </Form>
  );
}
