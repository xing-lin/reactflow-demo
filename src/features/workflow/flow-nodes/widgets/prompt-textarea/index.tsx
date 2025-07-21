import styles from './index.module.scss';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { Placeholder } from './placeholder';
import {
  BeautifulMentionNode,
  BeautifulMentionsPlugin,
} from 'lexical-beautiful-mentions';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { $getRoot, type EditorState } from 'lexical';
import { getMentionsTextContent, MENTION_TRIGGER } from './helper';
import { MenuContainer, MenuItem } from './menu';
import { MentionNode } from './mention';
import { Empty } from './empty';
import { memo, useMemo, useRef } from 'react';
import { SyncExternalValuePlugin } from './sync-external-value';
import { MaxLengthPlugin } from './max-length-plugin';
import { useAppSelector } from '@/app/hooks';
import { selectMentionOptions } from '@/features/workflow/slice';
import { cn } from '@/utils';

export interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

function PromptTextarea({
  id,
  value,
  onChange,
  disabled,
  placeholder = 'Enter your prompt here...',
  maxLength = 1000,
}: PromptTextareaProps) {
  const textareaValueRef = useRef<string>(null);

  const mentions = useAppSelector(selectMentionOptions);

  const mentionItems = useMemo(() => {
    return {
      [MENTION_TRIGGER.SLASH]: mentions.map((item) => {
        return {
          ...item,
          id: item.value,
        };
      }),
    };
  }, [mentions]);

  const onChangeContenteditable = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const value = getMentionsTextContent(root);

      textareaValueRef.current = value;
      onChange(value);
    });
  };

  // const setEditorState = (initialValue: string) => {
  //   return () => {
  //     const root = $getRoot();
  //     root.clear();
  //     const paragraph = $createParagraphNode();

  //     paragraph.append(...convertToMentionNodes(initialValue));
  //     root.append(paragraph);
  //   };
  // };

  return (
    <LexicalComposer
      initialConfig={{
        namespace: `workflow-mentions-${id}`,
        nodes: [
          MentionNode,
          {
            replace: BeautifulMentionNode,
            with: (node: BeautifulMentionNode) => {
              return new MentionNode(
                node.getTrigger(),
                node.getValue(),
                node.getData()
              );
            },
          },
        ],
        // editorState: setEditorState(initialValue || ''),
        onError(error: Error) {
          console.log('Lexical error->', error);
          throw error;
        },
        editable: !disabled,
      }}
    >
      <div className={cn('nodrag nopan nowheel', styles['mentions-container'])}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn(styles['textarea'], {
                [styles['textarea-disabled']]: disabled,
              })}
            />
          }
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <BeautifulMentionsPlugin
          emptyComponent={Empty}
          items={mentionItems}
          menuComponent={MenuContainer}
          menuItemComponent={MenuItem}
          allowSpaces={false}
        />
        <OnChangePlugin onChange={onChangeContenteditable} />
        <HistoryPlugin />
        <MaxLengthPlugin maxLength={maxLength} />
        <SyncExternalValuePlugin
          value={value}
          textareaValue={textareaValueRef.current}
          onChangeTextareaValue={(value) => {
            textareaValueRef.current = value;
          }}
        />
      </div>
    </LexicalComposer>
  );
}

export const PromptTextareaMemo = memo(PromptTextarea);
