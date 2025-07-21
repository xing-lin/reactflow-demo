import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createParagraphNode } from 'lexical';
import { convertToMentionNodes } from './helper';

export function SyncExternalValuePlugin({
  value,
  textareaValue,
  onChangeTextareaValue,
}: {
  value: string;
  textareaValue: string | null;
  onChangeTextareaValue: (value: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  const setEditorState = (initialValue: string) => {
    const root = $getRoot();
    root.clear();
    const paragraph = $createParagraphNode();

    paragraph.append(...convertToMentionNodes(initialValue));
    root.append(paragraph);
  };

  useEffect(() => {
    if (value && value !== textareaValue) {
      editor.update(() => {
        onChangeTextareaValue(value);
        setEditorState(value);

        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();

        paragraph.append(...convertToMentionNodes(value));
        root.append(paragraph);

        root.selectEnd();
      });
    }
  }, [editor, onChangeTextareaValue, textareaValue, value]);

  return null;
}
