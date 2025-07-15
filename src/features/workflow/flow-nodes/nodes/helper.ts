import { memo } from 'react';
import { FLOW_NODE_TYPE_KEY, type FlowNodeTypeDict } from './types';
import { FlowNodeInputParameters } from './input-parameters';
import { FlowNodeStart } from './start';
import { FlowNodeVisitPage } from './visit-page';
import { FlowNodeClickElement } from './click-element';
import { FlowNodeInputText } from './input-text';
import { FlowNodeExtractData } from './extract-data';
import { FlowNodeAddNodeButton } from './add-node-button';
import { FlowNodeFinishOutputData } from './finish-output-data';
import { FlowNodeLoop } from './loop';
import { FlowNodeScrollPage } from './scroll-page';
import { FlowNodeLoopContainer } from './loop-container';

export const isFlowNodeAddNodeButton = (type?: string): boolean => {
  return type === FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON;
};

export const isFlowNodeLoop = (type?: string): boolean => {
  return type === FLOW_NODE_TYPE_KEY.LOOP;
};

export const isFinishFlowNode = (type?: string): boolean => {
  return (
    type != null &&
    [FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA].includes(type as FLOW_NODE_TYPE_KEY)
  );
};

export const nodeTypes = {
  [FLOW_NODE_TYPE_KEY.ADD_NODE_BUTTON]: memo(FlowNodeAddNodeButton),
  [FLOW_NODE_TYPE_KEY.CLICK_ELEMENT]: memo(FlowNodeClickElement),
  [FLOW_NODE_TYPE_KEY.EXTRACT_DATA]: memo(FlowNodeExtractData),
  [FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA]: memo(FlowNodeFinishOutputData),
  [FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS]: memo(FlowNodeInputParameters),
  [FLOW_NODE_TYPE_KEY.INPUT_TEXT]: memo(FlowNodeInputText),
  [FLOW_NODE_TYPE_KEY.LOOP]: memo(FlowNodeLoop),
  [FLOW_NODE_TYPE_KEY.LOOP_CONTAINER]: memo(FlowNodeLoopContainer),
  [FLOW_NODE_TYPE_KEY.SCROLL_PAGE]: memo(FlowNodeScrollPage),
  [FLOW_NODE_TYPE_KEY.START]: memo(FlowNodeStart),
  [FLOW_NODE_TYPE_KEY.VISIT_PAGE]: memo(FlowNodeVisitPage),
};

export const FLOW_NODE_TYPES: FlowNodeTypeDict = {
  [FLOW_NODE_TYPE_KEY.VISIT_PAGE]: {
    type: FLOW_NODE_TYPE_KEY.VISIT_PAGE,
    title: 'Visit Page',
    iconSrc: '/images/flow-nodes/visit-page.svg',
    color: '#6FFFBE',
    description: 'Specify the page that needs to be visited and scraped.',
  },
  [FLOW_NODE_TYPE_KEY.CLICK_ELEMENT]: {
    type: FLOW_NODE_TYPE_KEY.CLICK_ELEMENT,
    title: 'Click Element',
    iconSrc: '/images/flow-nodes/click-element.svg',
    color: '#C1DBFF',
    description: 'Describe the target element to be clicked.',
  },
  [FLOW_NODE_TYPE_KEY.INPUT_TEXT]: {
    type: FLOW_NODE_TYPE_KEY.INPUT_TEXT,
    title: 'Input Text',
    iconSrc: '/images/flow-nodes/input-text.svg',
    color: '#C1DBFF',
    description: 'Specify the input field and the text to enter.',
  },
  [FLOW_NODE_TYPE_KEY.SCROLL_PAGE]: {
    type: FLOW_NODE_TYPE_KEY.SCROLL_PAGE,
    title: 'Scroll Page',
    iconSrc: '/images/flow-nodes/scroll-page.svg',
    color: '#C1DBFF',
    description: 'Define the scroll direction and target position.',
  },
  [FLOW_NODE_TYPE_KEY.EXTRACT_DATA]: {
    type: FLOW_NODE_TYPE_KEY.EXTRACT_DATA,
    title: 'Extract Data',
    iconSrc: '/images/flow-nodes/extract-data.svg',
    color: '#E6C1FF',
    description: 'Specify the data to extract and its scope on the page.',
  },
  [FLOW_NODE_TYPE_KEY.LOOP]: {
    type: FLOW_NODE_TYPE_KEY.LOOP,
    title: 'Loop',
    iconSrc: '/images/flow-nodes/loop.svg',
    color: '#FFCCC7',
    description: 'Define loop stop conditions and maximum iterations.',
  },
  [FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA]: {
    type: FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA,
    title: 'Finish · Output Data',
    iconSrc: '/images/flow-nodes/finish.svg',
    color: '#E6C1FF',
    description: 'Finalize and output the collected data.',
  },
  [FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS]: {
    type: FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
    title: 'Input Parameters',
    iconSrc: '/images/flow-nodes/input-parameters.svg',
    color: '#FFF1A9',
    description: 'The parameters input by the user when running the workflow.',
  },
  [FLOW_NODE_TYPE_KEY.START]: {
    type: FLOW_NODE_TYPE_KEY.START,
    title: 'Start',
    iconSrc: '/images/flow-nodes/start.svg',
    color: '#FFF1A9',
    description:
      'Define the workflow goals and the credentials to be used in the process before the workflow begins.',
  },
} as FlowNodeTypeDict;
