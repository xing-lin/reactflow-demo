import { FLOW_NODE_TYPE_KEY } from '../types';

import { type Node } from '@xyflow/react';

export const INPUT_PARAMETERS_TYPE_KEY = {
  INPUT_PARAMETER: 'input_parameters',
  LOGIN_CREDENTIAL: 'credential',
} as const;

export type INPUT_PARAMETERS_TYPE_KEY =
  (typeof INPUT_PARAMETERS_TYPE_KEY)[keyof typeof INPUT_PARAMETERS_TYPE_KEY];

export const INPUT_PARAMETERS_VALUE_TYPE_KEY = {
  STRING: 'string',
  INTEGER: 'integer',
  FLOAT: 'float',
  BOOLEAN: 'boolean',
} as const;

export type InputParametersValueTypeKey =
  (typeof INPUT_PARAMETERS_VALUE_TYPE_KEY)[keyof typeof INPUT_PARAMETERS_VALUE_TYPE_KEY];

export interface InputParametersData {
  [ID_KEY]: string;
  name: string;
  description: string;
  type: InputParametersValueTypeKey;
  default_enabled: boolean;
  default_value: string;

  value?: string;
}

export interface LoginCredentialsData {
  [ID_KEY]: string;
  platform: string;
  default_enabled: boolean;
  default_account: string;
  default_password: string;

  account?: string;
  password?: string;
}

export interface ModalData {
  open: boolean;
  type: INPUT_PARAMETERS_TYPE_KEY;
  mode: 'CREATE' | 'EDIT';
  initialValues: null | InputParametersData | LoginCredentialsData;
}

export type FlowNodeInputParametersPropsData = {
  [INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER]: InputParametersData[];
  [INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL]: LoginCredentialsData[];
};

export type FlowNodeInputParameters = Node<
  FlowNodeInputParametersPropsData,
  FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS
>;

export const INPUT_PARAMETERS_VALUE_TYPE_OPTIONS = [
  {
    label: 'String',
    value: INPUT_PARAMETERS_VALUE_TYPE_KEY.STRING,
  },
  {
    label: 'Integer',
    value: INPUT_PARAMETERS_VALUE_TYPE_KEY.INTEGER,
  },
  {
    label: 'float',
    value: INPUT_PARAMETERS_VALUE_TYPE_KEY.FLOAT,
  },
  {
    label: 'boolean',
    value: INPUT_PARAMETERS_VALUE_TYPE_KEY.BOOLEAN,
  },
];

export const ID_KEY = '_id';

export const getModalTitle = (props: ModalData) => {
  const { mode, type } = props;

  switch (type) {
    case INPUT_PARAMETERS_TYPE_KEY.INPUT_PARAMETER:
      return `${mode === 'CREATE' ? 'Add' : 'Edit'} input parameter`;
    case INPUT_PARAMETERS_TYPE_KEY.LOGIN_CREDENTIAL:
      return `${mode === 'CREATE' ? 'Add' : 'Edit'} login credential parameter`;
  }
};
