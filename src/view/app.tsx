import { L7Editor } from '@antv/l7-editor';
import './index.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    //@ts-ignore
    const state = window.vscode.getState();
    const savedData = state?.savedData;
    console.log(savedData, '321234124');
  }, []);

  return (
    <div className="tool">
      <L7Editor />
    </div>
  );
}
export default App;
