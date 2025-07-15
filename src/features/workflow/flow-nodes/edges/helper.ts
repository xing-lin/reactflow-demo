import { memo } from 'react';
import { EdgeGray } from './edge-gray';
import { EdgeGrayWithAddButton } from './edge-gray-with-add-button';
import { FLOW_NODE_TYPE_KEY } from '../nodes';

export enum FLOW_EDGE_TYPE_KEY {
  GRAY = 'GRAY',
  GRAY_WITH_ADD_BUTTON = 'GRAY_WITH_ADD_BUTTON',
}

export const edgeTypes = {
  [FLOW_EDGE_TYPE_KEY.GRAY]: memo(EdgeGray),
  [FLOW_EDGE_TYPE_KEY.GRAY_WITH_ADD_BUTTON]: memo(EdgeGrayWithAddButton),
};

export const getEdgeType = (type?: string): FLOW_EDGE_TYPE_KEY => {
  switch (type) {
    case FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON:
      return FLOW_EDGE_TYPE_KEY.GRAY;
    case FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS:
      return FLOW_EDGE_TYPE_KEY.GRAY;

    default:
      return FLOW_EDGE_TYPE_KEY.GRAY_WITH_ADD_BUTTON;
  }
};
