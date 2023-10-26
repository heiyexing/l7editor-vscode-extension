import { L7Editor } from '@antv/l7-editor';
import './index.css';
import React, { useEffect } from 'react';

function App() {
  //@ts-ignore
  const data = window.fc;

  return (
    <div className="tool">
      <L7Editor
        features={data.features}
      />
    </div>
  );
}
export default App;
