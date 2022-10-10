// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const child = require('child_process');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "debugger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json 
	let disposable = vscode.commands.registerCommand('debugger.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Debugger!');
	});


	let disposable2 = vscode.commands.registerCommand("extension.getDocument", function(){

		const editor = vscode.window.activeTextEditor;

		if (editor){
			let document = editor.document;

			const content = document.getText();
			console.log(content)
		}

		vscode.window.showInformationMessage('Document !');


		const res = child.execFileSync(__dirname + '\\test.exe', ['arg0', 'arg1']);
        console.log(res)
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
