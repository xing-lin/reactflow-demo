import type { FlowNodeAddNodeButton } from './add-node-button/types';
import type { FlowNodeClickElement } from './click-element/types';
import type { FlowNodeExtractData } from './extract-data/types';
import type { FlowNodeFinishOutputData } from './finish-output-data/types';
import type { FlowNodeInputParameters } from './input-parameters/types';
import type { FlowNodeInputText } from './input-text/types';
import type { FlowNodeLoopContainer } from './loop-container/types';
import type { FlowNodeLoop } from './loop/types';
import type { FlowNodeScrollPage } from './scroll-page/types';
import type { FlowNodeStart } from './start/types';
import type { FlowNodeVisitPage } from './visit-page/types';

export enum FLOW_NODE_TYPE_KEY {
  INPUT_PARAMETERS = 'INPUT_PARAMETERS',
  START = 'START',
  VISIT_PAGE = 'ACCESS_URL',
  CLICK_ELEMENT = 'CLICK',
  INPUT_TEXT = 'INPUT',
  SCROLL_PAGE = 'SCROLL',
  EXTRACT_DATA = 'COLLECT',
  LOOP = 'LOOP',
  LOOP_CONTAINER = 'LOOP_CONTAINER',
  FINISH_OUTPUT_DATA = 'OUTPUT',
  ADD_NODE_BUTTON = 'ADD_NODE_BUTTON',
}

export interface FlowNodeType {
  type: FLOW_NODE_TYPE_KEY;
  title: string;
  iconSrc: string;
  color: string;
  description: string;
}

export type FlowNodeTypeDict = Record<
  Exclude<FLOW_NODE_TYPE_KEY, 'ADD_NODE_BUTTON' | 'LOOP_CONTAINER'>,
  FlowNodeType
>;

type UtilityNode = FlowNodeAddNodeButton | FlowNodeLoopContainer;

type WorkflowBlockNode =
  | FlowNodeClickElement
  | FlowNodeExtractData
  | FlowNodeFinishOutputData
  | FlowNodeInputParameters
  | FlowNodeInputText
  | FlowNodeLoop
  | FlowNodeScrollPage
  | FlowNodeStart
  | FlowNodeVisitPage;

export type FlowNode = UtilityNode | WorkflowBlockNode;
