import { type BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { forwardRef } from 'react';
import { Tooltip } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { cn } from '@/utils';
import { useAppSelector } from '@/app/hooks';
import { selectMentionOptions } from '@/features/workflow/slice';

export const MentionContainer = forwardRef<
  HTMLDivElement,
  BeautifulMentionComponentProps
>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { trigger, value, nodeKey, ...otherProps } = props;
  // const mentions = useWorkflowParametersStore((state) => state.mentions);
  const mentions = useAppSelector(selectMentionOptions);

  const [isSelected] = useLexicalNodeSelection(nodeKey);

  const text = value;

  /**
   * 检测 mention 是否已经存在
   * 不需要展示UI错误的话，直接在点击开始的时候进行数据的校验判断
   */
  const exists = mentions.map((item) => item.value).includes(value);

  const title = exists
    ? text
    : 'The referenced parameters have been deleted. Please modify them and try again';

  return (
    <Tooltip title={title}>
      <span
        {...otherProps}
        ref={ref}
        className={cn(
          'inline-flex h-5.5 w-fit items-center gap-1 rounded-md border border-[#d9d9d9] bg-white px-2 max-w-full overflow-hidden',

          {
            'bg-black/6': isSelected && exists,
          },
          {
            'hover:bg-black/6': exists,
          },
          {
            'border-[#ffccc7] bg-[#FFF2F0]': !exists,
          }
        )}
      >
        {exists ? (
          <span className="size-3 rounded-full bg-[#E1E1E1]" />
        ) : (
          <WarningOutlined className="text-[#FF4D4F]!" />
        )}
        <span className="truncate max-w-full">{text}</span>
      </span>
    </Tooltip>
  );
});

MentionContainer.displayName = 'MentionContainer';
