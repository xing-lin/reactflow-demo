import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { getPopupContainer, isCreateMode } from '../../helper';
import { HandlesWrapper } from '../../ui';
import { Divider, Dropdown, type MenuProps, Tooltip } from 'antd';
import {
  INPUT_PARAMETERS_TYPE_KEY,
  type ModalData,
  type FlowNodeInputParameters,
  ID_KEY,
} from './types';

import { type NodeProps, useReactFlow } from '@xyflow/react';
import { ModalInputParameters, type ModalOkData } from './modal';
import { useEffect, useState } from 'react';
import { NodePanelContainerMemo } from '../../widgets';
import { FLOW_NODE_TYPE_KEY } from '../types';
import { cn } from '@/utils';
import { useAppDispatch } from '@/app/hooks';
import { setMentionOptions } from '@/features/workflow/slice';

export function FlowNodeInputParameters({
  id,
  data,
}: NodeProps<FlowNodeInputParameters>) {
  const dispatch = useAppDispatch();
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    const inputParameters = data[
      INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER
    ]?.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });

    const loginCredentials = data[
      INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL
    ]?.map((item) => {
      return {
        label: [item.platform, item.default_account].filter(Boolean).join(':'),
        value: item.platform,
      };
    });

    dispatch(
      setMentionOptions([
        ...(inputParameters || []),
        ...(loginCredentials || []),
      ])
    );
  }, [data, dispatch]);

  const [modalData, setModalData] = useState<ModalData>({
    type: INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER,
    mode: 'CREATE',
    initialValues: null,
    open: false,
  });

  const items: MenuProps['items'] = [
    {
      key: INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER,
      label: 'Input Parameters',
    },
    {
      key: INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL,
      label: 'Login Credentials',
    },
  ].map((item) => {
    return {
      ...item,
      onClick: () => {
        setModalData({
          open: true,
          type: item.key,
          mode: 'CREATE',
          initialValues: null,
        });
      },
    };
  });

  const onDeleteItem = (type: INPUT_PARAMETERS_TYPE_KEY, idValue: string) => {
    updateNodeData(id, ({ data }) => {
      const lastValues = Array.isArray(data[type]) ? data[type] : [];

      return {
        [type]: lastValues.filter((item) => item[ID_KEY] !== idValue),
      };
    });
  };
  const onEditModal = (
    type: INPUT_PARAMETERS_TYPE_KEY,
    initialValues: ModalData['initialValues']
  ) => {
    setModalData({
      open: true,
      type,
      mode: 'EDIT',
      initialValues,
    });
  };

  const onOkModal = ({ type, mode, values }: ModalOkData) => {
    updateNodeData(id, ({ data }) => {
      const lastValues = Array.isArray(data[type]) ? data[type] : [];

      return {
        [type]: isCreateMode(mode)
          ? [...lastValues, values]
          : lastValues.map((item) =>
              item[ID_KEY] === values?.[ID_KEY] ? values : item
            ),
      };
    });
  };

  const onCancelModal = () => {
    setModalData({
      open: false,
      type: INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER,
      mode: 'CREATE',
      initialValues: null,
    });
  };

  return (
    <HandlesWrapper hideSourceHandle>
      <NodePanelContainerMemo
        id={id}
        type={FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS}
      >
        <div className="pt-2">
          <Dropdown
            menu={{ items }}
            getPopupContainer={getPopupContainer}
            trigger={['click']}
          >
            <button
              type="button"
              className="btn text-45 mb-4 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#d9d9d9] bg-black/4 text-xs/4.5"
            >
              <PlusOutlined />
              <span>Add parameters</span>
            </button>
          </Dropdown>

          {data[INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER]?.length > 0 ? (
            <div>
              <div className="text-45 mb-2 flex items-center text-sm/5.5">
                <span className="mr-1">Input parameters:</span>
                <Tooltip
                  title="Parameters needed in the process"
                  getPopupContainer={getPopupContainer}
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
              <ul className="flex flex-col gap-2">
                {data[INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER]?.map(
                  (item) => {
                    const idValue = item[ID_KEY];
                    return (
                      <li
                        key={idValue}
                        className="flex h-8 items-center rounded-md bg-black/4 px-3"
                      >
                        <div className="text-88 truncate text-sm/5.5">
                          {item['name']}
                        </div>
                        <div className="text-45 ml-auto flex items-center">
                          <button
                            aria-label="Edit"
                            className="btn text-sm"
                            onClick={() =>
                              onEditModal(
                                INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER,
                                item
                              )
                            }
                          >
                            <EditOutlined />
                          </button>
                          <Divider type="vertical" />
                          <button
                            aria-label="Delete"
                            className="btn text-sm"
                            onClick={() =>
                              onDeleteItem(
                                INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER,
                                idValue
                              )
                            }
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : null}

          {data[INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL]?.length > 0 ? (
            <div className="mt-2">
              <div className="text-45 mb-2 flex items-center text-sm/5.5">
                <span className="mr-1">Login credentials:</span>
                <Tooltip
                  title="When the platform login is triggered during the process, the credentials will be used to log in"
                  getPopupContainer={getPopupContainer}
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
              <ul className="flex flex-col gap-2">
                {data[INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL]?.map(
                  (item) => {
                    const idValue = item[ID_KEY];
                    const { platform, default_account } = item;
                    return (
                      <li
                        key={idValue}
                        className="flex h-8 items-center gap-2 rounded-md bg-black/4 px-3"
                      >
                        <div className="flex flex-1 items-center gap-2 overflow-hidden text-sm/5.5">
                          <div className="text-88 max-w-1/2 flex-none truncate">
                            {platform}
                          </div>
                          {default_account ? (
                            <div className="text-45 max-w-1/2 flex-none truncate">
                              {default_account}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-45 ml-auto flex items-center">
                          <button
                            aria-label="Edit"
                            className={cn('text-sm btn')}
                            onClick={() => {
                              onEditModal(
                                INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL,
                                item
                              );
                            }}
                          >
                            <EditOutlined />
                          </button>
                          <Divider type="vertical" />
                          <button
                            aria-label="Delete"
                            className={cn('text-sm btn')}
                            onClick={() => {
                              onDeleteItem(
                                INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL,
                                idValue
                              );
                            }}
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </NodePanelContainerMemo>

      <ModalInputParameters
        modalData={modalData}
        onCancel={onCancelModal}
        onOk={onOkModal}
      />
    </HandlesWrapper>
  );
}
