import path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let editor = vscode.commands.registerCommand('l7-editor', () => {
    const panel = vscode.window.createWebviewPanel(
      'React',
      'React App',
      vscode.ViewColumn.One,
      {
        retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
        enableScripts: true, // 运行 JS 执行
      },
    );

    const isProduction =
      context.extensionMode === vscode.ExtensionMode.Production;
    let srcUrl = '';
    if (isProduction) {
      const filePath = vscode.Uri.file(
        path.join(context.extensionPath, 'dist', 'static/js/main.js'),
      );
      srcUrl = panel.webview.asWebviewUri(filePath).toString();
    } else {
      srcUrl = 'http://localhost:3000/static/js/main.js';
    }
    panel.webview.html = getWebviewContent(srcUrl);

    const updateWebview = () => {
      panel.webview.html = getWebviewContent(srcUrl);
    };
    updateWebview();
  });

  context.subscriptions.push(editor);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent(srcUri: string) {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>webview-react</title>
    <script defer="defer" src="${srcUri}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`;
}
