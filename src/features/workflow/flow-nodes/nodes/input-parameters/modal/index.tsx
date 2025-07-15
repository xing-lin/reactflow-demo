import { App, Form, type FormProps, Modal } from 'antd';
import {
  getModalTitle,
  ID_KEY,
  INPUT_PARAMETERS_TYPE_KEY,
  type InputParametersData,
  type LoginCredentialsData,
  type ModalData,
} from '../types';
import { ModalForm } from './form';
import { v4 as getUuid } from 'uuid';
import { useAppSelector } from '@/app/hooks';
import { selectMentionOptions } from '@/features/workflow/slice';

export interface ModalOkData {
  type: ModalData['type'];
  mode: ModalData['mode'];
  values: ModalData['initialValues'];
}

interface Props {
  modalData: ModalData;
  onCancel: () => void;
  onOk: (data: ModalOkData) => void;
}

const formId = `formModalInputParameters`;
export function ModalInputParameters({ modalData, onCancel, onOk }: Props) {
  const mentionOptions = useAppSelector(selectMentionOptions);

  const { message } = App.useApp();

  const { open, type, mode } = modalData;
  const title = getModalTitle(modalData);

  const [form] = Form.useForm<ModalData['initialValues']>();

  const onCancelHandler = () => {
    form.resetFields();
    onCancel?.();
  };

  const onFinish: FormProps['onFinish'] = (
    values: ModalData['initialValues']
  ) => {
    if (values == null) {
      throw new Error('values is null');
    }

    const create = mode === 'CREATE';

    const mentionValues = mentionOptions.map((item) => item.value);

    if (
      create &&
      mentionValues.includes(
        type === INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER
          ? (values as InputParametersData).name
          : (values as LoginCredentialsData).platform
      )
    ) {
      message.error('Parameter  cannot be repeated');
      return;
    }

    onOk?.({
      type,
      mode,
      values: create
        ? { ...values, [ID_KEY]: getUuid() }
        : { ...modalData.initialValues, ...values },
    });

    onCancelHandler();
  };

  return (
    <Modal
      destroyOnHidden
      maskClosable={false}
      title={title}
      open={open}
      onCancel={onCancelHandler}
      okButtonProps={{
        htmlType: 'submit',
        form: formId,
      }}
    >
      <ModalForm
        modalData={modalData}
        form={form}
        onFinish={onFinish}
        id={formId}
      />
    </Modal>
  );
}
