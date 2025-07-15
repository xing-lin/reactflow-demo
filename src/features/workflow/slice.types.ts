import type { FLOW_NODE_TYPE_KEY } from './flow-nodes';

export interface InitialState {
  paletteDrawerData: PaletteDrawerData;

  promptDrawerData: PromptDrawerData;

  mentionOptions: MentionOptions[];
}

interface PaletteDrawerData {
  open: boolean;
  initialValues: null | {
    previous?: string;
    next: string;
    parent?: string;
    limitLoop: boolean;
  };
}

interface PromptDrawerData {
  open: boolean;
  initialValues: null | {
    nodeId: string;
    nodeType: FLOW_NODE_TYPE_KEY;
    onChangePrompt: (value: string) => void;
  };
}

interface MentionOptions {
  label: string;
  value: string;
}
