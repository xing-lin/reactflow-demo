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
import { $createParagraphNode, $getRoot, type EditorState } from 'lexical';
import {
  convertToMentionNodes,
  getMentionsTextContent,
  MENTION_TRIGGER,
} from './helper';
import { MenuContainer, MenuItem } from './menu';
import { MentionNode } from './mention';
import { Empty } from './empty';
import { memo, useMemo } from 'react';
import { cn } from '@/utils';
import { useAppSelector } from '@/app/hooks';
import { selectMentionOptions } from '@/features/workflow/slice';

export interface PromptTextareaProps {
  initialValue: string;
  onChange: (value: string) => void;
  id: string;
  disabled?: boolean;
  placeholder?: string;
}

function PromptTextarea({
  id,
  initialValue,
  onChange,
  disabled,
  placeholder = 'Enter your prompt here...',
}: PromptTextareaProps) {
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

      console.log('textarea value->', value);
      onChange(value);
    });
  };

  const setEditorState = (initialValue: string) => {
    return () => {
      const root = $getRoot();
      root.clear();
      const paragraph = $createParagraphNode();

      console.log(convertToMentionNodes(initialValue));
      paragraph.append(...convertToMentionNodes(initialValue));
      root.append(paragraph);
    };
  };

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
        editorState: setEditorState(initialValue || ''),
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
      </div>
    </LexicalComposer>
  );
}

export const PromptTextareaMemo = memo(PromptTextarea);
