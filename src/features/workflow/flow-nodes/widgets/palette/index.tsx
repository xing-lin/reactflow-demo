import { CloseOutlined } from '@ant-design/icons';
import { NodeIcon } from '../../ui';
import { useReactFlow } from '@xyflow/react';
import { FLOW_NODE_TYPE_KEY, FLOW_NODE_TYPES } from '../../nodes';
import { addNode } from './helper';
import { cn } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectPaletteDrawerData,
  setPaletteDrawerData,
} from '@/features/workflow/slice';

export function FlowPaletteNode() {
  const nodes = [
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.VISIT_PAGE],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.CLICK_ELEMENT],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.INPUT_TEXT],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.SCROLL_PAGE],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.EXTRACT_DATA],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.LOOP],
    FLOW_NODE_TYPES[FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA],
  ];

  const { setNodes, getNodes, getEdges, setEdges } = useReactFlow();
  // const { zoom: flowZoom } = useViewport();

  const { open, initialValues } = useAppSelector(selectPaletteDrawerData);
  const dispatch = useAppDispatch();

  const handleAddNode = (nodeType: FLOW_NODE_TYPE_KEY) => {
    const oldNodes = getNodes();
    const oldEdges = getEdges();

    const { positionedEdges, positionedNodes } = addNode({
      oldNodes,
      oldEdges,
      nodeType,
      data: initialValues,
    });

    setNodes(positionedNodes);
    setEdges(positionedEdges);

    onCloseWorkflowPanel();
  };

  const onCloseWorkflowPanel = () => {
    dispatch(setPaletteDrawerData({ open: false, initialValues: null }));
  };

  // const handleCenter = () => {
  //   const node = getNode('1');

  //   if (!node) {
  //     return;
  //   }
  //   const nodeCenterX = node.position.x + (node?.measured?.width || 0) / 2;
  //   const nodeCenterY = node.position.y + (node?.measured?.height || 0) / 2;

  //   console.log('x, y->', nodeCenterX, nodeCenterY);

  //   setCenter(nodeCenterX, nodeCenterY, { zoom: flowZoom });
  // };

  return (
    <div
      className={cn(
        'absolute top-4 right-4 bottom-4 z-9 w-0 overflow-hidden rounded-lg bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.04)] transition-all duration-300',
        { 'w-[400px]': open }
      )}
    >
      <header className="text-88 flex min-w-100 items-center gap-2 border-b border-[rgba(5,5,5,0.06)] px-6 py-4 text-base">
        <button
          onClick={onCloseWorkflowPanel}
          className="h-6 w-6"
          type="button"
        >
          <CloseOutlined />
        </button>
        <h2 className="font-semibold">Node action library</h2>
      </header>
      <section className="min-w-100 p-6">
        <header className="text-65 mb-2">Add a node:</header>
        <ul className="flex flex-col gap-2">
          {nodes.map((item) => {
            const { type, title, description, iconSrc, color } = item;
            return (
              <li
                key={type}
                className="btn flex items-center gap-2 rounded-md border border-[#D9D9D9] px-3 py-2"
                onClick={() => handleAddNode(type)}
              >
                <NodeIcon color={color} src={iconSrc} alt={title} />
                <div className="">
                  <h3 className="text-88 text-sm/5.5 font-medium">{title}</h3>
                  <p className="text-45 text-xs/4.5">{description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      {/* <button onClick={handleCenter}>平移</button> */}
    </div>
  );
}
