import { cn } from '@/utils';
import { Tooltip } from 'antd';
import { type BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';

export const MenuItem = forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { selected, item, itemValue: _, ...restProps } = props;
  const text = item.data?.label;

  return (
    <Tooltip title={text}>
      <li
        className={cn(
          'flex h-8 cursor-pointer items-center gap-2 pr-2 pl-3 text-sm/5.5',
          {
            'bg-black/4': selected,
          }
        )}
        {...restProps}
        ref={ref}
      >
        <div className="size-3.5 rounded-full bg-[#e1e1e1]" />
        <div className="text-88">{text}</div>
      </li>
    </Tooltip>
  );
});

MenuItem.displayName = 'MenuItem';
