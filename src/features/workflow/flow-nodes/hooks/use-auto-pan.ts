import { type Node, useReactFlow } from '@xyflow/react';
import { useLayoutEffect } from 'react';

const useAutoPan = (
  editorElementRef: React.RefObject<HTMLDivElement | null>,
  nodes: Node[]
) => {
  const { setViewport, getViewport } = useReactFlow();

  useLayoutEffect(() => {
    const editorElement = editorElementRef.current;
    if (editorElement) {
      const scrollTop = editorElement.scrollTop;

      if (scrollTop === 0) {
        return;
      }

      editorElement.scrollTop = 0;
      const { x, y, zoom } = getViewport();
      const panAmount = editorElement.clientHeight * 0.3;

      setViewport(
        { x, y: y - (scrollTop + panAmount), zoom },
        { duration: 300 }
      );
    }
  }, [nodes, editorElementRef, setViewport, getViewport]);
};

export { useAutoPan };
