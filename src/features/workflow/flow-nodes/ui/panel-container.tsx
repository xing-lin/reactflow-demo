import { Collapse, type CollapseProps, Divider } from 'antd';
import { NodeIcon, type NodeIconProps } from './node-icon';
import { NODE_PANEL_CONTAINER_WIDTH } from '../nodes/loop-container/helper';
import { cn } from '@/utils';

interface Props extends Required<Pick<NodeIconProps, 'color' | 'src'>> {
  title: string;
  children: React.ReactNode;
  description?: string;
  onDelete?: () => void;
  onChangeCollapse?: CollapseProps['onChange'];
  active: boolean;
}

export function PanelContainer({
  color,
  src,
  title,
  children,
  description,
  onDelete,
  onChangeCollapse,
  active,
}: Props) {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <header className="flex items-center gap-2">
          <NodeIcon color={color} src={src} alt={title} />
          <h2 className="text-88 text-sm/6 font-bold">{title}</h2>
        </header>
      ),
      children: (
        <>
          {description ? (
            <h3 className="text-45 mt-1 mr-4 ml-8 text-xs/4.5">
              {description}
            </h3>
          ) : null}
          {children}
        </>
      ),
      extra:
        typeof onDelete === 'function' ? (
          <div
            className="flex items-center gap-2 pl-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Divider type="vertical" className="!top-0 !mx-0" />

            <button
              aria-label="close icon"
              className="grid size-4 cursor-pointer place-content-center rounded hover:bg-black/4"
              onClick={onDelete}
              type="button"
            >
              <img
                alt="close icon"
                src="/images/flow-nodes/close.svg"
                width={16}
                height={16}
              />
            </button>
          </div>
        ) : undefined,
    },
  ];

  return (
    <Collapse
      onChange={onChangeCollapse}
      className={cn(
        '[&_.ant-collapse-header]:!items-center [&_.ant-collapse-header]:!p-3',
        '[&_.ant-collapse-item-active>.ant-collapse-header]:!pb-0',
        '[&_.ant-collapse-extra]:order-1',
        '[&_.ant-collapse-content-box]:!p-3 [&_.ant-collapse-content-box]:!pt-0 [&_.ant-collapse-content-box]:!pb-4',
        'border! border-transparent!',
        {
          'border-[#18C566]! shadow-[0px_4px_24px_0px_rgba(29,222,116,0.2)]!':
            active,
        }
      )}
      items={items}
      defaultActiveKey={['1']}
      expandIconPosition="end"
      bordered={false}
      style={{
        width: NODE_PANEL_CONTAINER_WIDTH,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.04)',
      }}
      expandIcon={(props) => {
        const { isActive } = props;
        return (
          <button
            aria-label="expand icon"
            className="grid size-4 cursor-pointer place-content-center rounded hover:bg-black/4"
            type="button"
          >
            <img
              alt="expand icon"
              src={`/images/flow-nodes/collapse-${
                isActive ? 'up' : 'down'
              }.svg`}
              width={16}
              height={16}
            />
          </button>
        );
      }}
    />
  );
}
