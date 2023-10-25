import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

//@ts-ignore
const vscode = acquireVsCodeApi();
//@ts-ignore
window.vscode = vscode;

root?.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
