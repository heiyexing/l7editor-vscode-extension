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

    let editor = vscode.window.activeTextEditor;
    if (editor) {
      let document = editor.document;
      if (document.languageId === 'json') {
        let jsonText = document.getText();
        try {
          let parsedJson = JSON.parse(jsonText);
          //  parsedJson获取到的json数据
          console.log(parsedJson)
          vscode.window.showInformationMessage(
            'JSON data retrieved successfully!',
          );
        } catch (error) {
          vscode.window.showErrorMessage('Error parsing JSON file!');
        }
      } else {
        vscode.window.showErrorMessage('Please select a JSON file!');
      }
    } else {
      vscode.window.showErrorMessage('No JSON file is active!');
    }
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
    <style>
    html,body {
      margin: 0;
      padding: 0;
    }
  </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`;
}
