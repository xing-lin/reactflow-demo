import { ReactFlowProvider } from '@xyflow/react';
import { Workflow } from './features/workflow';

function App() {
  return (
    <ReactFlowProvider>
      <Workflow />
    </ReactFlowProvider>
  );
}

export default App;
