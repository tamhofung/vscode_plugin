// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const child = require('child_process');
const axios = require('axios');
const http = require('http');
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


	let disposable2 = vscode.commands.registerCommand("extension.getDocument", function () {
		
		const editor = vscode.window.activeTextEditor;

		if (editor){
			let document = editor.document;

			const content = document.getText();
			console.log(content)
		}

		//vscode.window.showInformationMessage('Document !');
		
		const options = {
			hostname: '127.0.0.1:8000',
			path: '/items/12',
			method: 'GET'
		};
			

		axios.get('http:127.0.0.1:8000/items/12')
		.then(response =>  {
			vscode.window.showInformationMessage("asdada");
			vscode.window.showInformationMessage("Data:" + JSON.stringify(response.data));
			console.log(response.data);
			//console.log(response.data.url);
			//console.log(response.data.explanation);
		})
		.catch(error => {
			console.log(error);
		});
		/*
		const req = http.request(options, (res) => {
			let data = ''
			 
			res.on('data', (chunk) => {
				data += chunk;
			});
			
			// Ending the response 
			res.on('end', () => {
				console.log('Body:', JSON.parse(data))
			});
			   
		}).on("error", (err) => {
			console.log("Error: ", err)
		}).end()
		*/
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
